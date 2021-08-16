import { useEffect, useState } from 'react';
import { db } from '../firebase/config';

const useFirestore = (collection, doc) => {
  useEffect(() => {
    const addData = db
      .collection(collection)
      .doc(doc)
      .set({
        ticker: doc.ticker,
        shares: doc.shares,
      })
      .then(() => {
        console.log('Document successfully written!');
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
      });
    return () => {
      addData();
    };
  }, [collection, doc]);
};

export default useFirestore;

// const useFirestore = (collection) => {
//   const [docs, setDocs] = useState([]);

//   useEffect(() => {
//     const unsubscribe = projectFirestore
//       .collection(collection)
//       .orderBy('createdAt', 'desc')
//       .onSnapshot((snapshot) => {
//         let documents = [];
//         snapshot.forEach((doc) => {
//           documents.push({ ...doc.data(), id: doc.id });
//         });
//         setDocs(documents);
//       });

//     return () => unsubscribe();
//   }, [collection]);
//   return { docs };
// };

// export default useFirestore;
