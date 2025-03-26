import React, {
  useEffect,
  useState,
  forwardRef,
  ReactElement,
  Ref,
} from "react";
import { fetchItems } from "./lib/api/items";
import ItemGrid from "./components/ItemGrid/ItemGrid";

import {
  Container,
  Box,
  Typography,
  Alert,
  Skeleton,
  Pagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  useMediaQuery,
  Slide,
  Theme,
  Grid2,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

interface Item {
  id: number;
  title: string;
  description: string;
  created_at?: string;
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Home: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(8);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  useEffect(() => {
    const getItems = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetchItems(page, limit);
        setItems(res.data);
        setTotal(res.pagination.total);
      } catch (err: any) {
        setError("Failed to fetch items");
      } finally {
        setLoading(false);
      }
    };

    getItems();
  }, [page, limit]);

  const totalPages = Math.ceil(total / limit);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleCardClick = (item: Item) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Box
        component="header"
        sx={{
          py: 2,
          borderBottom: "1px solid #ddd",
          position: "sticky",
          top: 0,
          backgroundColor: "#fff",
          zIndex: 1100,
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h4" align="center" gutterBottom>
            Items
          </Typography>
        </Container>
      </Box>

      <Box
        component="main"
        flexGrow={1}
        sx={{ py: 2, overflowY: "auto" }}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Container maxWidth="md">
          {error && (
            <Alert severity="error" sx={{ my: 2 }}>
              {error}
            </Alert>
          )}

          {loading && !error && (
            <Grid2
              container
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
              {Array.from({ length: limit }, (_, idx) => (
                <Grid2
                  size={
                    isMobile
                      ? { xs: 12, sm: 6 }
                      : { xs: 12, sm: 6, md: 4, lg: 3 }
                  }
                  key={`skeleton-${idx}`}
                >
                  <Skeleton
                    data-testid="loading-skeleton"
                    variant="rectangular"
                    height={152}
                    width={200}
                    animation="wave"
                  />
                  <Box mt={1}>
                    <Skeleton
                      data-testid="loading-skeleton"
                      variant="text"
                      width="60%"
                      animation="wave"
                    />
                    <Skeleton
                      data-testid="loading-skeleton"
                      variant="text"
                      width="80%"
                      animation="wave"
                    />
                  </Box>
                </Grid2>
              ))}
            </Grid2>
          )}

          {!loading && !error && (
            <ItemGrid items={items} onCardClick={handleCardClick} />
          )}
        </Container>
      </Box>

      <Box
        component="footer"
        sx={{
          py: 2,
          borderTop: "1px solid #ddd",
          position: "sticky",
          bottom: 0,
          backgroundColor: "#fff",
          zIndex: 1100,
        }}
      >
        <Container maxWidth="md">
          {!loading && !error && totalPages > 1 && (
            <Box display="flex" justifyContent="center">
              <Pagination
                color="primary"
                count={totalPages}
                page={page}
                onChange={handlePageChange}
              />
            </Box>
          )}
        </Container>
      </Box>

      <Dialog
        open={!!selectedItem}
        onClose={handleCloseModal}
        fullScreen={isMobile}
        slots={{ transition: Transition }}
      >
        {selectedItem && (
          <>
            <DialogTitle>{selectedItem.title}</DialogTitle>
            <DialogContent>
              <DialogContentText>{selectedItem.description}</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseModal} autoFocus>
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default Home;
