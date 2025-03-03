import React, { useState } from "react";
import styled from "styled-components";
import { rem } from "./shared.styles";
import { CatProps } from '../public/types';
import { CatModal } from './catModal';
import { Button } from './shared.styles';

const CatWrapper = styled.div`
    border: 1px solid black;
    border-radius: 5px;

    width: ${rem(200)};
    height: ${rem(350)};
    margin: ${rem(16)};
    padding: ${rem(16)};

    display: flex;
    flex-direction: column;
`;

const CatImage = styled.img`
    width: 100%;
    height: ${rem(150)};
    object-fit: contain;
`;

const CatName = styled.h2`
    font-size: ${rem(16)};
`;

interface CatBreedProps {
    cat: CatProps;
    handleDeleteCat: (id: number) => void;
}

export const CatBreed: React.FC<CatBreedProps> = ({ cat, handleDeleteCat }) => {
    const [showModal, setShowModal] = useState(false);
    const [catData, setCatData] = useState(cat);

    const handleViewDetails = () => {
        setShowModal(true);
    };

    const handleSave = (updatedCat: CatProps) => {
        setCatData(updatedCat);
        setShowModal(false); // Close the modal after saving
    };

    const handleDelete = () => {
        if (catData.id !== undefined) {
            handleDeleteCat(catData.id);
        }
        setShowModal(false); // Close the modal after saving
    };

    return (
        <>
            <CatWrapper key={catData.id}>
                <CatName>{catData.name}</CatName>
                <CatImage src={catData.image} alt={catData.name} />
                <p><strong>Size:</strong> {catData.size}</p>
                <p><strong>Fur type:</strong> {catData.furType}</p>
                <Button onClick={handleViewDetails}>View Details</Button>
            </CatWrapper>
            <CatModal show={showModal} cat={catData} onSave={handleSave} onDelete={handleDelete} setCatData={setCatData} setShowModal={setShowModal}>
                <>
                    <h2>{catData.name}</h2>
                    <img src={catData.image} alt={catData.name} style={{ width: '100%', height: 'auto' }} />
                    <p><strong>Size:</strong> {catData.size}</p>
                    <p><strong>Fur type:</strong> {catData.furType}</p>
                    <p><strong>Color:</strong> {catData.color}</p>
                    <p><strong>Characteristic:</strong> {catData.characteristic}</p>
                    <p>{catData.description}</p>
                </>
            </CatModal>
        </>
    );
}