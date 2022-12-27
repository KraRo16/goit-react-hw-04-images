import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import fetchImagesWithQuery from './Api/Api';
import Modal from './Modal/Modal';
import Button from './Button/Button';
// import Loader from './Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import style from './App.module.css';
import { BallTriangle } from 'react-loader-spinner';

export default function App() {
  const [searchData, setSearchData] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(0);
  const [largeImage, setLargeImage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!page) {
      return;
    }
    try {
      setIsLoading(true);
      const response = fetchImagesWithQuery(searchData, page);
      response.then(data => {
        data.data.hits.length === 0
          ? toast.error('Ooops')
          : setImages(images => [...images, ...data.data.hits]);
        setIsVisible(page < Math.ceil(data.data.totalHits / 12));
      });
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [page, searchData]);

  const onSubmit = newSearchData => {
    if (newSearchData.trim() === '') {
      return toast.error('Enter the meaning for search');
    } else if (newSearchData === searchData) {
      return;
    }
    setSearchData(newSearchData);
    setPage(1);
    setImages([]);
  };

  const nextPage = () => {
    setPage(p => p + 1);
  };

  const openModal = index => {
    setShowModal(true);
    setLargeImage(images[index].largeImageURL);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className={style.App}>
      <Searchbar onSubmit={onSubmit} />
      {images.length !== 0 && (
        <ImageGallery images={images} openModal={openModal} />
      )}
      {showModal && <Modal toggleModal={toggleModal} largeImage={largeImage} />}
      {isLoading && (
        <BallTriangle
          className={style.spin}
          height={100}
          width={100}
          radius={5}
          color="#4fa94d"
          ariaLabel="ball-triangle-loading"
          wrapperClass={{}}
          wrapperStyle=""
          visible={true}
        />
      )}
      <ToastContainer autoClose={2500} />
      {isVisible && <Button nextPage={nextPage} onLoad={isLoading} />}
    </div>
  );
}
