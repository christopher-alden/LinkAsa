import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { clientStorage } from '../lib/firebase';

const usePhoto = () => {
  const uploadPhoto = async (photo:File, parentPath:string) => {
    if (!photo) return null;

    const uniquePhotoName = `${photo.name}_${uuidv4()}`;
    const fullPath = `${parentPath}/${uniquePhotoName}`;
    const photoRef = ref(clientStorage, fullPath);

    await uploadBytes(photoRef, photo);
    return fullPath;
  };

  const getPhotoURL = async (path:string) => {
    const photoRef = ref(clientStorage, path);
    try {
      return await getDownloadURL(photoRef);
    } catch (error) {
      console.error('Error fetching photo:', error);
      return null;
    }
  };

  return { uploadPhoto, getPhotoURL };
};

export default usePhoto;
