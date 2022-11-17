import React, { useEffect, useState, useCallback, useContext } from 'react';
import { useDropzone } from 'react-dropzone';
import uploadIcon from '../../Assets/uploadIcon.svg';
import paperTilt from '../../Assets/paper-plane-tilt_1.svg';
import cancelIcon from '../../Assets/cancelLogo.svg';
import { Link } from 'react-router-dom';
import { ImageContainer } from './fileUpload.styles';
import { UploadContext } from '../Context/Upload.context';
const FileUpload = ({
  classNameFileUpload,
  ClassNameDeskUpload,
  view,
  message,
  handleOnclick,
}) => {
  let [files, setfFles] = useState([]);

  const [acceptedFiles, setAcceptedFiles] = useState([]);
  const { setAcceptdFilesContext } = useContext(UploadContext);

  const onDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {
      console.log('accepted files', acceptedFiles);
      setAcceptedFiles(acceptedFiles);
      setAcceptdFilesContext(acceptedFiles);

      acceptedFiles.forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = () => {
          setfFles((prev) => [...prev, reader.result]);
        };
        reader.readAsDataURL(file);
      });
    },
    [setAcceptdFilesContext]
  );

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    noClick: true,
  });

  useEffect(() => {
    console.log('files ', files);
  }, [files]);
  const handleOnDelete = (indexToRemove) => {
    const result = acceptedFiles.filter(
      (item, index) => index !== indexToRemove
    );
    setAcceptedFiles(result);
  };

  const fileLength = files.length;

  // const handleUpload = () => {
  //   console.log('Uploading files....');
  //   axios
  //     .post('/api/desk/uploadImage', { files })
  //     .then((response) => console.log(response.data))
  //     .catch((error) => console.log(error.message));
  // };
  return (
    <>
      <div {...getRootProps()}>
        <input {...getInputProps()} />

        {acceptedFiles.map((file, index) => {
          return (
            <ImageContainer key={index}>
              <img
                src={files[index]}
                alt={`Img Upload -- ${index}`}
                className='w-[88px] h-[88px] rounded-lg'
              />

              <span className='flex flex-col'>
                <h2 className='mt-4'>{file.name}</h2>
                {file.size >= 0 && file.size <= 100000 ? (
                  <small>{Math.round(file.size / 1000)} Kb</small>
                ) : file.size >= 100000 && file.size <= 1000000 ? (
                  <small>{Math.round(file.size / 1000)}</small>
                ) : (
                  <small>{file.size} bytes</small>
                )}
              </span>
              <img
                src={cancelIcon}
                alt='cancel'
                className='absolute right-2 bottom-3'
                onClick={() => handleOnDelete(index)}
              />
            </ImageContainer>
          );
        })}
      </div>
      <section className={`${files.length === 1 && 'mt-2'}`}>
        <img
          src={uploadIcon}
          alt='uploadIcon'
          onClick={open}
          // onKeyPress={message ? onEnterPress : null}
          className={classNameFileUpload}
        />
        {/* <button onClick={handleUpload}>Upload</button> */}

        <div>
          {!view && (
            <Link to={(fileLength > 0 || message) && '/admin'}>
              <img
                src={paperTilt}
                alt='papertilt'
                onClick={handleOnclick}
                className={ClassNameDeskUpload}
              />
            </Link>
          )}
        </div>
      </section>
    </>
  );
};
export default FileUpload;
