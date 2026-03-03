"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchVitalsThunk, addVitalThunk, deleteVitalThunk, updateVitalThunk } from "@/redux/feature/vitals/vitals.thunk";
import { Plus, AlertCircle } from "lucide-react";
import { clearVitalsError } from "@/redux/feature/vitals/vitals.slice";
import { toast } from "sonner";
import PageHeader from "@/components/shared/PageHeader";
import VitalsStatsOverview from "@/components/vitals/VitalsStatsOverview";
import VitalsHistoryTable from "@/components/vitals/VitalsHistoryTable";
import AddVitalModal from "@/components/vitals/AddVitalModal";

export default function VitalsPage() {
    const dispatch = useDispatch<AppDispatch>();
    const { vitals, loading, error } = useSelector((state: RootState) => state.vitals);
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingVitalId, setEditingVitalId] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        type: 'BP',
        value: '',
        unit: 'mmHg',
        note: '',
        readingDate: new Date().toISOString().split('T')[0]
    });

    useEffect(() => {
        dispatch(fetchVitalsThunk());
    }, [dispatch]);

    const resetForm = () => {
        setFormData({
            type: 'BP',
            value: '',
            unit: 'mmHg',
            note: '',
            readingDate: new Date().toISOString().split('T')[0]
        });
        setEditingVitalId(null);
        setShowAddModal(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (editingVitalId) {
            const resultAction = await dispatch(updateVitalThunk({ id: editingVitalId, updates: formData }));
            if (updateVitalThunk.fulfilled.match(resultAction)) {
                toast.success("Health log updated successfully!");
                resetForm();
            } else {
                toast.error(resultAction.payload as string || "Failed to update record.");
            }
        } else {
            const resultAction = await dispatch(addVitalThunk(formData));
            if (addVitalThunk.fulfilled.match(resultAction)) {
                toast.success("New health log added!");
                resetForm();
            } else {
                toast.error(resultAction.payload as string || "Failed to add record.");
            }
        }
    };

    const handleEdit = (vital: any) => {
        setFormData({
            type: vital.type,
            value: vital.value,
            unit: vital.unit || '',
            note: vital.note || '',
            readingDate: new Date(vital.readingDate).toISOString().split('T')[0]
        });
        setEditingVitalId(vital._id);
        setShowAddModal(true);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this record?")) {
            const resultAction = await dispatch(deleteVitalThunk(id));
            if (deleteVitalThunk.fulfilled.match(resultAction)) {
                toast.success("Record deleted successfully.");
            } else {
                toast.error("Failed to delete record.");
            }
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <PageHeader
                title="Vitals Tracking"
                description="Keep a record of your daily health readings."
                action={{
                    label: "Add New Reading",
                    onClick: () => setShowAddModal(true),
                    icon: Plus
                }}
            />

            {error && (
                <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 font-bold">
                    <AlertCircle size={20} />
                    {error}
                    <button onClick={() => dispatch(clearVitalsError())} className="ml-auto underline text-xs">Clear</button>
                </div>
            )}

            <VitalsStatsOverview vitals={vitals} />

            <VitalsHistoryTable
                vitals={vitals}
                loading={loading}
                onDelete={handleDelete}
                onEdit={handleEdit}
            />

            <AddVitalModal
                show={showAddModal}
                onClose={resetForm}
                onSubmit={handleSubmit}
                formData={formData}
                setFormData={setFormData}
                isEditing={!!editingVitalId}
            />
        </div>
    );
}
