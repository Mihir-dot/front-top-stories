// NewsList.js
import React, { useState } from 'react';
import NewsArticle from './NewArticle';
import './NewsList.css';
import Modal from './Modal';
import axios from 'axios';
import 'react-dropdown/style.css';

function NewsList() {
    const baseUrl = 'http://localhost:3000/api/top-stories';

    const sections = [
        {
            label: 'Arts',
            value: 'arts',
        },
        {
            label: 'Home',
            value: 'home',
        },
        {
            label: 'Science',
            value: 'science',
        },
        {
            label: 'Us',
            value: 'us',
        },
        {
            label: 'World',
            value: 'world',
        },
    ];

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentArticle, setCurrentArticle] = useState(null);
    const [topStoriesData, setTopStoriesData] = useState([]);
    const [input, setInput] = useState('');
    const [selectedSection, setSelectedSection] = useState({});
    const [loading, setLoading] = useState(false);

    const sendData = () => {
        if (!selectedSection) {
            alert('Please select a section');
        } else if (input === "") {
            alert('Please enter api key');
        } else {
            setLoading(true);
            try {
                const requestBody = {
                    section: selectedSection?.toLowerCase(),
                    api_key: input,
                }

                axios.post(baseUrl, requestBody, {
                    contentType: 'application/json',
                }).then(
                    (response) => {
                        const result = response.data;
                        setTopStoriesData(result);
                        setLoading(false);
                    },
                    (error) => {
                        console.log(error);
                        setLoading(false);
                    }
                );
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
    }

    const openModal = (article) => {
        setCurrentArticle(article);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const onChangeSection = (event) => {
        setSelectedSection(event.target.value);
    }

    return (
        <>
            <h1 className='main-title'>Top Stories</h1>

            <div className='form-container'>
                <select name="sections" id="section-select" onChange={onChangeSection}>
                    <option value="">--Please choose a section--</option>
                    {sections.map((section, index) => (
                        <option key={index}>{section.label}</option>
                    ))}
                </select>

                <div className='input-container'>
                    <input id=''
                        placeholder='Enter API key'
                        style={{
                            padding: 10
                        }}
                        value={input} onInput={e => setInput(e.target.value)} />
                </div>

                <div
                    onClick={() => {
                        sendData()
                    }}
                    className='cButton'>
                    <span style={{
                        color : '#fff'
                    }}>Send</span>
                </div>
            </div>

            {loading ? (
                <div style={{
                    marginLeft: 20,
                    marginTop: 20,
                }}>
                    <div>Loading ...</div>
                </div>
            ) : topStoriesData.length > 0 ? (
                <div className="news-list">
                    {topStoriesData.map((article, index) => (
                        <NewsArticle
                            key={index}
                            article={article}
                            onClicks={(article) => {
                                openModal(article);
                            }}
                        />
                    ))}
                    {isModalOpen &&
                        <Modal
                            onClose={closeModal}
                            article={currentArticle}
                        />
                    }
                </div>
            ) : null}
        </>
    );
}

export default NewsList;
