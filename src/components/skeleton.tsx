import { Card, CardContent, Skeleton } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

export const TruckListSkeleton = () => (
  <>
    {Array.from({ length: 3 }, () => ({
      id: uuidv4(),
    })).map(({ id }) => (
      <Card key={id} sx={{ mb: 2 }}>
        <CardContent>
          <Skeleton variant="text" width={150} height={30} />
          <Skeleton variant="text" width={120} />
          <Skeleton variant="text" width={100} />
        </CardContent>
      </Card>
    ))}
  </>
);
