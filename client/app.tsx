import { useState, useEffect } from 'react';
import { CatProps } from '../public/types';
import { CatBreed } from './catBreed';
import { AddCatModal } from './addCatModal';
import { rem, Button } from './shared.styles';

import styled from 'styled-components';

const AppContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    felx-direction: row;
    space-between: 10px;
    justify-content: center;
    align-items: center;
    padding: 20px;
`;

const CatsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: center;
    align-items: center;
`;

const AddButton = styled(Button)`
    padding: ${rem(20)};
    width: ${rem(200)};
`;

const App = () => {
    const [data, setData] = useState<CatProps[]>([]);
    const [showAddModal, setShowAddModal] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/cat-breeds');
                const data = await res.json();
                setData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleAddCat = (newCat: CatProps) => {
        setData([...data, newCat]);
    };

    const handleDeleteCat = (id: number) => {
        const updatedData = data.filter(cat => cat.id !== id);
        setData(updatedData);
    };

    return (
        <AppContainer>
            <h1>Cat breeds</h1>
            <CatsContainer>
                {data?.map((cat: CatProps) => {
                    return (
                        <CatBreed
                            key={cat.id}
                            cat={cat}
                            handleDeleteCat={handleDeleteCat}
                        />
                    );
                })}
            </CatsContainer>
            <AddButton onClick={() => setShowAddModal(true)}>
                Add cat breed
            </AddButton>
            <AddCatModal 
                dataLength={data.length} 
                show={showAddModal} 
                onClose={() => setShowAddModal(false)} 
                onSave={handleAddCat} 
            />
        </AppContainer>
    );
}

export default App