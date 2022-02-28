import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import {
  Box,
  Button,
  Chip,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import shortid from "shortid";
import { httpPostRequest } from "src/common/helpers/httpHelper";
import { useFetchRequest } from "src/common/hooks/fetchHook";
import { useAppDispatch, useAppSelector } from "src/common/hooks/hooks";
import { alertActions } from "src/features/alert/state/alertSlice";
import {
  Abaque,
  CorrelationType,
  Equation,
} from "src/features/correlations/state/types";
import { Parameter } from "src/features/orders/state/types";
import { Category } from "src/features/parameters/state/types";
import { correlationsRoute } from "src/routes/routePaths";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export function CorrelationForm() {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const user = useAppSelector((state) => state.login.currentUser);
  const [parameters, setParameters] = useState<Parameter[]>([]);
  const [selectedParameters, setSelectedParameters] = useState<string[]>([]);
  const [outputParameterId, setOutputParameterId] = useState<string>("");
  const [correlationType, setCorrelationType] = useState<string>("");
  const { response }: { response: Response | undefined } = useFetchRequest(
    "api/parameter/get-parameters",
    "GET"
  );

  const handleSelectParameter = (
    event: SelectChangeEvent<typeof selectedParameters>
  ) => {
    const sparams: string[] = event.target.value as string[];
    setSelectedParameters(sparams);
  };

  function GetBase64(file: any, cb: any) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        cb(reader.result);
        resolve("resolved");
      };
      reader.onerror = function (error) {
        reject("rejected");
      };
    });
  }

  const handleAddNewCorrelation = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const equationArray: Equation[] = [];
    const abaqueArray: Abaque[] = [];

    for (let i: number = 0; i < equationFormList.length; i++) {
      const equation: Equation = {
        equation: data.get("equationInput" + i) as string,
        applicability: data.get("applicability" + i) as string,
        reference: data.get("reference" + i) as string,
      };

      equationArray.push(equation);
    }

    for (let i: number = 0; i < abaqueList.length; i++) {
      const file = data.get("abaqueImageString" + i);
      let imageBase64 = "";
      await GetBase64(file, (result: any) => {
        imageBase64 = result;
        imageBase64 = imageBase64.split(",")[1];
        const abaque: Abaque = {
          title: data.get("abaqueTitle" + i) as string,
          imageString: imageBase64,
        };

        abaqueArray.push(abaque);
      });
    }

    if (equationArray.length === 0 && abaqueArray.length === 0) {
      dispatch(
        alertActions.createAlert({
          message: "Veuillez ajouter des équations ou des abaques",
          type: "warning",
        })
      );

      return;
    }

    const typeString = data.get(
      "correlationType"
    ) as unknown as CorrelationType;

    let newCorrelation = {
      inputsList: (data.get("inputParameters") as string).split(","),
      outputId: data.get("outputParameter") as string,
      type: CorrelationType[typeString],
      equations: equationArray,
      abaques: abaqueArray,
    };

    var response = await httpPostRequest(
      "api/correlation/add",
      "POST",
      user?.token,
      newCorrelation
    );

    if (typeof response === "string") {
      dispatch(
        alertActions.createAlert({
          message: response,
          type: "error",
        })
      );
    } else {
      if (response?.ok) {
        history.push("");
        history.push(correlationsRoute);
        dispatch(
          alertActions.createAlert({
            message: await response.text(),
            type: "success",
          })
        );
      }
    }
  };

  const [equationFormList, setEquationFormList] = useState<any>([]);
  const handleAddEquationTable = () => {
    setEquationFormList(
      equationFormList.concat(
        <EquationForm
          key={equationFormList.length}
          inputValue={"equationInput" + equationFormList.length}
          appliValue={"applicability" + equationFormList.length}
          refValue={"reference" + equationFormList.length}
        />
      )
    );
  };
  const handleRemoveEquationTable = () => {
    if (equationFormList.length > 0) {
      setEquationFormList(
        equationFormList.slice(0, equationFormList.length - 1)
      );
    }
  };

  const [abaqueList, setAbaqueList] = useState<any>([]);
  const handleAddAbaque = () => {
    setAbaqueList(
      abaqueList.concat(
        <AbaqueForm
          key={abaqueList.length}
          abaqueTitle={"abaqueTitle" + abaqueList.length}
          abaqueImageString={"abaqueImageString" + abaqueList.length}
        />
      )
    );
  };
  const handleRemoveAbaque = () => {
    if (abaqueList.length > 0) {
      setAbaqueList(abaqueList.slice(0, abaqueList.length - 1));
    }
  };

  useEffect(() => {
    const handleGetAllParameters = async () => {
      if (response?.ok) {
        const content: Category[] = await response?.clone().json();
        const params: Parameter[] = [];
        content.forEach((c) => {
          c.parameterList.forEach((p) => {
            params.push(p);
          });
        });
        setParameters(params);
      }
    };

    handleGetAllParameters();
  }, [response]);

  type AbaqueFormProps = {
    abaqueTitle: string;
    abaqueImageString: string;
  };
  function AbaqueForm({ abaqueTitle, abaqueImageString }: AbaqueFormProps) {
    return (
      <Box
        sx={{
          border: "1px solid",
          borderColor: "primary.main",
          borderRadius: "2px",
          padding: "8px",
          marginBottom: "16px",
        }}
      >
        <TextField
          variant="standard"
          name={abaqueTitle}
          type="text"
          fullWidth
          placeholder="Titre de l'abaque"
        />
        <TextField
          name={abaqueImageString}
          type="file"
          fullWidth
          required
          variant="standard"
          sx={{ marginTop: "16px" }}
          inputProps={{ accept: "image/png" }}
        />
      </Box>
    );
  }

  return (
    <>
      <Grid item sx={{ margin: "16px" }}>
        <Paper elevation={8} sx={{ paddingX: "16px", paddingY: "16px" }} square>
          <Grid container>
            <Grid item>
              <Typography variant="h6" sx={{ color: "text.secondary" }}>
                Ajouter une nouvelle corrélation
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Box component="form" onSubmit={handleAddNewCorrelation}>
        <Grid item sx={{ margin: "16px" }}>
          <Paper
            elevation={8}
            sx={{ paddingX: "16px", paddingY: "16px" }}
            square
          >
            <Grid container flexDirection="column">
              <Grid item>
                <FormControl
                  variant="standard"
                  fullWidth={true}
                  required
                  sx={{ marginTop: "16px" }}
                >
                  <InputLabel id="inputParameterLabel">
                    Paramètres d'entrées
                  </InputLabel>
                  <Select
                    multiple
                    labelId="inputParameters"
                    id={shortid()}
                    name="inputParameters"
                    value={selectedParameters}
                    onChange={handleSelectParameter}
                    label="Paramètre d'entrée"
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip
                            key={value}
                            label={
                              parameters.find((x) => x.id === value)?.name +
                              ` (${
                                parameters.find((x) => x.id === value)?.symbole
                              })`
                            }
                          />
                        ))}
                      </Box>
                    )}
                    MenuProps={MenuProps}
                  >
                    {parameters.map((param) => (
                      <MenuItem key={param.id} value={param.id}>
                        {param.name}{" "}
                        {param.symbole !== undefined && `(${param.symbole})`}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl
                  variant="standard"
                  fullWidth={true}
                  required
                  sx={{ marginTop: "16px" }}
                >
                  <InputLabel id="outputParameterLabel">
                    Paramètre de sortie
                  </InputLabel>
                  <Select
                    labelId="outputParameter"
                    id="outputParameter"
                    name="outputParameter"
                    value={outputParameterId}
                    onChange={(event) =>
                      setOutputParameterId(event.target.value)
                    }
                    label="Paramètre de sortie"
                  >
                    {parameters.map((param) => (
                      <MenuItem key={param.id} value={param.id}>
                        {param.name} ({param.symbole})
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl
                  component="fieldset"
                  required
                  variant="standard"
                  sx={{ marginTop: "16px" }}
                >
                  <FormLabel component="legend">Type de corrélation</FormLabel>
                  <RadioGroup
                    aria-label="correlationType"
                    name="correlationType"
                    onChange={(event) => setCorrelationType(event.target.value)}
                  >
                    <FormControlLabel
                      value="Abaque"
                      control={<Radio />}
                      label="Abaque"
                    />
                    <FormControlLabel
                      value="Equation"
                      control={<Radio />}
                      label="Équation"
                    />
                  </RadioGroup>
                </FormControl>
                {correlationType === "Equation" ? (
                  <>
                    <Grid container>
                      <Grid item sx={{ marginTop: "8px" }}>
                        <Typography variant="button">
                          Tableaux des équations
                        </Typography>
                      </Grid>
                      <Grid item>
                        <IconButton
                          aria-label="remove"
                          size="medium"
                          onClick={handleRemoveEquationTable}
                        >
                          <RemoveCircleOutlineIcon
                            fontSize="inherit"
                            color="secondary"
                          />
                        </IconButton>
                      </Grid>
                      <Grid item>
                        <IconButton
                          aria-label="add"
                          size="medium"
                          onClick={handleAddEquationTable}
                        >
                          <AddCircleOutlineIcon
                            fontSize="inherit"
                            color="primary"
                          />
                        </IconButton>
                      </Grid>
                    </Grid>
                    {equationFormList}
                  </>
                ) : null}

                {correlationType === "Abaque" ? (
                  <>
                    <Grid container>
                      <Grid item sx={{ marginTop: "8px" }}>
                        <Typography variant="button">
                          Liste des abaques
                        </Typography>
                      </Grid>
                      <Grid item>
                        <IconButton
                          aria-label="remove"
                          size="medium"
                          onClick={handleRemoveAbaque}
                        >
                          <RemoveCircleOutlineIcon
                            fontSize="inherit"
                            color="secondary"
                          />
                        </IconButton>
                      </Grid>
                      <Grid item>
                        <IconButton
                          aria-label="add"
                          size="medium"
                          onClick={handleAddAbaque}
                        >
                          <AddCircleOutlineIcon
                            fontSize="inherit"
                            color="primary"
                          />
                        </IconButton>
                      </Grid>
                    </Grid>
                    {abaqueList}
                  </>
                ) : null}
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item sx={{ margin: "16px" }}>
          <Grid container>
            <Grid item md={12} sm={12}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{ width: "100%" }}
              >
                Ajouter
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

type EquationFormProps = {
  inputValue: string;
  appliValue: string;
  refValue: string;
};

function EquationForm({ inputValue, appliValue, refValue }: EquationFormProps) {
  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: "primary.main",
        borderRadius: "2px",
        padding: "8px",
        marginBottom: "16px",
      }}
    >
      <TextField
        id={inputValue}
        name={inputValue}
        label="Équation"
        type="text"
        fullWidth
        variant="standard"
        required
        autoFocus
      />
      <TextField
        sx={{ marginTop: "16px" }}
        id={appliValue}
        name={appliValue}
        label="Applicabilité"
        type="text"
        fullWidth
        variant="standard"
        required
      />
      <TextField
        sx={{ marginY: "16px" }}
        id={refValue}
        name={refValue}
        label="Référence"
        type="text"
        fullWidth
        variant="standard"
        required
      />
    </Box>
  );
}
