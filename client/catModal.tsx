import React, { useState } from 'react';
import { CatProps } from '../public/types';
import { EditForm } from './editForm';
import { Overlay, ModalContent, Button, CloseButton } from './shared.styles';

interface ModalProps {
    show: boolean;
    cat: CatProps;
    onSave: (cat: CatProps) => void;
    onDelete: (id: number) => void;
    setCatData: (cat: CatProps) => void;
    setShowModal: (show: boolean) => void;
    children: React.ReactNode;
}

const CatModal: React.FC<ModalProps> = ({ show, cat, onSave, onDelete, setCatData, setShowModal, children }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(cat);

    if (!show) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/api/cat-breeds/${formData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const updatedCat = await response.json();

                onSave(updatedCat);
                setIsEditing(false);
                setShowModal(false);
            } else {
                console.error('Failed to update cat breed');
            }
        } catch (error) {
            console.error('Error updating cat breed:', error);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/cat-breeds/${cat.id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                if (cat.id !== undefined) {
                    onDelete(cat.id);
                } else {
                    console.error('Cat ID is undefined');
                }
                setShowModal(false);
            } else {
                console.error('Failed to delete cat breed');
            }
        } catch (error) {
            console.error('Error deleting cat breed:', error);
        }
    };

    return (
        <Overlay>
            <ModalContent>
                <CloseButton onClick={() => setShowModal(false)}>Close</CloseButton>
                {isEditing ? (
                    <EditForm
                        formData={formData}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        setIsEditing={setIsEditing}
                        setCatData={setCatData}
                        setFormData={setFormData}
                        setShowModal={setShowModal}
                    />
                ) : (
                    <>{children}</>
                )}
                <Button onClick={() => setIsEditing(true)}>Edit details</Button>
                <Button onClick={() => handleDelete()}>Delete cat breed</Button>
            </ModalContent>
        </Overlay>
    );
};

export { CatModal };