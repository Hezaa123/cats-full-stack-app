import { Overlay, ModalContent, Form, SaveButton, CloseButton, Input, TextArea } from "./shared.styles";
import { CatProps } from '../public/types';

interface EditFormProps {
    formData: CatProps;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleSubmit: (e: React.FormEvent) => void;
    setIsEditing: (isEditing: boolean) => void;
    setFormData: (formData: CatProps) => void;
    setCatData: (cat: CatProps) => void;
    setShowModal: (show: boolean) => void;
}

const EditForm: React.FC<EditFormProps> = ({
    formData,
    handleChange,
    handleSubmit,
    setIsEditing,
    setFormData,
    setCatData,
    setShowModal
}) => {
    const handleClick = () => {
        setIsEditing(false);
        setFormData(formData);
        setCatData(formData);
    }

    return (
        <Overlay>
            <ModalContent>
                <CloseButton 
                    onClick={() => { 
                        setShowModal(false);
                        setIsEditing(false);
                    }}
                >
                    Close
                </CloseButton>
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
                    <SaveButton type="submit" onClick={() => handleClick()}>Save</SaveButton>
                </Form>
            </ModalContent>
        </Overlay>
    );
}

export { EditForm };