import { Card, CardContent, Skeleton } from "@mui/material";

export const TruckListSkeleton = () => (
  <>
    {Array.from({ length: 3 }).map((_, index) => (
      <Card key={index} sx={{ mb: 2 }} data-testid="Card">
        <CardContent>
          {[150, 120, 100].map((width, i) => (
            <Skeleton
              key={i}
              variant="text"
              width={width}
              height={i === 0 ? 30 : undefined}
              data-testid="Skeleton"
            />
          ))}
        </CardContent>
      </Card>
    ))}
  </>
);
