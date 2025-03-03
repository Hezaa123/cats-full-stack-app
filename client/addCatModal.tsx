import React, { useState } from 'react';
import { Overlay, ModalContent, Form, SaveButton, CloseButton, Input, TextArea } from './shared.styles';
import { CatProps } from '../public/types';

interface AddCatModalProps {
    dataLength: number;
    show: boolean;
    onClose: () => void;
    onSave: (newCat: CatProps) => void;
}

const AddCatModal: React.FC<AddCatModalProps> = ({ show, onClose, onSave }) => {
    const [formData, setFormData] = useState<CatProps>({
        name: '',
        characteristic: '',
        size: '',
        furType: '',
        color: '',
        description: '',
        image: ''
    });

    if (!show) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/cat-breeds', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const newCat = await response.json();
                onSave(newCat);
                onClose(); // Close the modal after saving
                resetFormData();
            } else {
                console.error('Failed to add cat breed');
            }
        } catch (error) {
            console.error('Error adding cat breed:', error);
        }
    };

    const resetFormData = () => {
        setFormData({
            name: '',
            characteristic: '',
            size: '',
            furType: '',
            color: '',
            description: '',
            image: ''
        });
    }

    return (
        <Overlay>
            <ModalContent>
                <CloseButton onClick={onClose}>Close</CloseButton>
                <Form onSubmit={handleSubmit}>
                    <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Name"
                    />
                    <Input
                        type="text"
                        name="characteristic"
                        value={formData.characteristic}
                        onChange={handleChange}
                        placeholder="Characteristic"
                    />
                    <Input
                        type="text"
                        name="size"
                        value={formData.size}
                        onChange={handleChange}
                        placeholder="Size"
                    />
                    <Input
                        type="text"
                        name="furType"
                        value={formData.furType}
                        onChange={handleChange}
                        placeholder="Fur Type"
                    />
                    <Input
                        type="text"
                        name="color"
                        value={formData.color}
                        onChange={handleChange}
                        placeholder="Color"
                    />
                    <TextArea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Description"
                    />
                    <Input
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        placeholder="Image URL"
                    />
                    <SaveButton type="submit">Save</SaveButton>
                </Form>
            </ModalContent>
        </Overlay>
    );
};

export { AddCatModal };