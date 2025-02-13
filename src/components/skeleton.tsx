import { Card, CardContent, Skeleton } from "@mui/material";

export const TruckListSkeleton = () => (
  <>
    {[...Array(3)].map((_, index) => (
      <Card key={index} sx={{ mb: 2 }}>
        <CardContent>
          <Skeleton variant="text" width={150} height={30} />
          <Skeleton variant="text" width={120} />
          <Skeleton variant="text" width={100} />
        </CardContent>
      </Card>
    ))}
  </>
);
