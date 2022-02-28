import {
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import shortid from "shortid";
import { useAppSelector } from "src/common/hooks/hooks";
import { CorrelationForm } from "src/features/correlations/components/CorrelationForm";
import { CorrelationTables } from "src/features/correlations/components/CorrelationTables";
import { CorrelationType } from "src/features/correlations/state/types";

export function CorrelationDetails() {
  const selectedCorrelation = useAppSelector(
    (state) => state.correlations.selectedCorrelation
  );

  return (
    <Grid
      container
      flexDirection="column"
      flexWrap="nowrap"
      sx={{
        "@media (min-width:900px)": {
          gridRow: "right",
          gridColumn: "right",
        },
        "@media (max-width:900px)": {
          display: "none",
        },
      }}
    >
      {selectedCorrelation === undefined ? (
        <CorrelationForm />
      ) : (
        <>
          <Grid item sx={{ margin: "16px" }}>
            <Paper
              elevation={8}
              sx={{ paddingX: "16px", paddingY: "16px" }}
              square
            >
              <Grid container alignItems="center">
                <Grid item>
                  <Typography variant="button">
                    Id de la corrélation:
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", marginLeft: "4px" }}
                  >
                    {selectedCorrelation?.id}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container alignItems="center">
                <Grid item>
                  <Typography variant="button">Description:</Typography>
                </Grid>
                <Grid item>
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", marginLeft: "4px" }}
                  >
                    {selectedCorrelation?.description}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container alignItems="center">
                <Grid item>
                  <Typography variant="button">Type:</Typography>
                </Grid>
                <Grid item>
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", marginLeft: "4px" }}
                  >
                    {CorrelationType[selectedCorrelation.type]}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid>
            <Grid item sx={{ marginX: "16px" }}>
              <Paper elevation={8} square>
                <CorrelationTables
                  key={shortid()}
                  title="Liste des paramètres d'entrées"
                  headers={["Catégorie", "Nom (unité)", "Symbole"]}
                  parameters={selectedCorrelation.inputsList}
                />
              </Paper>
            </Grid>
            <Grid item sx={{ margin: "16px" }}>
              <Paper elevation={8} square>
                <CorrelationTables
                  key={shortid()}
                  title="Le paramètre de sortie"
                  headers={["Catégorie", "Nom (unité)", "Symbole"]}
                  parameters={[selectedCorrelation.outputId]}
                />
              </Paper>
            </Grid>
            {selectedCorrelation?.equations?.length !== 0 && (
              <Grid item sx={{ marginX: "16px", marginBottom: "16px" }}>
                <Paper elevation={8} square>
                  <CorrelationTables
                    key={shortid()}
                    title="Tableau des équations"
                    headers={["Équation", "Applicable à", "Références"]}
                    equations={selectedCorrelation?.equations}
                  />
                </Paper>
              </Grid>
            )}
            {selectedCorrelation.abaques?.length !== 0 &&
              selectedCorrelation.abaques !== undefined &&
              selectedCorrelation.abaques.map((aba, index) => (
                <Grid
                  key={aba.id}
                  item
                  sx={{ marginX: "16px", marginBottom: "16px" }}
                >
                  <Paper elevation={8} square>
                    <Card>
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          Titre de l'abaque {index + 1}: {aba.title}
                        </Typography>
                      </CardContent>
                      <CardMedia
                        component="img"
                        alt={aba.title}
                        image={aba.imageString}
                      />
                    </Card>
                    <Divider />
                  </Paper>
                </Grid>
              ))}
          </Grid>
        </>
      )}
    </Grid>
  );
}
