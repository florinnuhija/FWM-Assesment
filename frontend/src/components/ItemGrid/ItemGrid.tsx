import React from "react";
import { Card, CardContent, Typography, Fade, Grid2 } from "@mui/material";

interface Item {
  id: number;
  title: string;
  description: string;
}

interface ItemGridProps {
  items: Item[];
  onCardClick: (item: Item) => void;
}

const ItemGrid: React.FC<ItemGridProps> = ({ items, onCardClick }) => {
  return (
    <Grid2 container spacing={2} justifyContent="start" alignItems="stretch">
      {items.map((item, index) => (
        <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }} key={item.id}>
          <Fade
            in={true}
            style={{ transitionDelay: `${index * 75}ms` }}
            timeout={300}
          >
            <Card
              variant="outlined"
              onClick={() => onCardClick(item)}
              sx={{
                textAlign: "center",
                minHeight: "150px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                cursor: "pointer",
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-3px) scale(1.02)",
                  boxShadow: 3,
                },
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {item.title}
                </Typography>
              </CardContent>
            </Card>
          </Fade>
        </Grid2>
      ))}
    </Grid2>
  );
};

export default ItemGrid;
