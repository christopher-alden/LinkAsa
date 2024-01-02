import { useEffect, useState } from "react";


import Grid from "@mui/material/Unstable_Grid2";


import ItemCard from "../../widgets/cards/ItemCard";
import { clientDb } from "../../../lib/firebase";
import usePhoto from "../../../hooks/usePhoto";
import useCrud from "../../../hooks/useCrud";
import DashboardCard from "../../shared/DashboardCard";

// ----------------------------------------------------------------------

const ViewLostItem = () => {
  const { getPhotoURL } = usePhoto();
  const { documents, loading, error } = useCrud({
    db: clientDb,
    collectionName: "lost_and_found",
    transformDoc: (doc) => ({
      id: doc.id,
      ...doc.data(),
      photo: doc.data().photo,
    }),
  });
  const [lostItems, setLostItems] = useState<LostItem[]>([]);

  useEffect(() => {
    const transformItems = async () => {
      const itemsWithPhotos = await Promise.all(
        documents.map(async (item) => ({
          ...item,
          photo: item.photo ? await getPhotoURL(item.photo) : null,
        }))
      );
      setLostItems(itemsWithPhotos);
    };

    if (documents.length > 0) {
      transformItems();
    }
  }, [documents]);

  if (loading) return null;
  return (
    <DashboardCard title="View Lost Items">
      <>
        <Grid container spacing={3}>
          {lostItems.map((item, index) => (
            <Grid key={index} xs={12} sm={6} md={3}>
              <ItemCard item={item} />
            </Grid>
          ))}
        </Grid>
      </>
    </DashboardCard>
  );
};
export default ViewLostItem;
