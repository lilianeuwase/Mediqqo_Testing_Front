import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function DiabDietTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center" colSpan={3}>
              Diet and Diabetes
            </StyledTableCell>
          </TableRow>
          <TableRow>
            <StyledTableCell>Leaves, Vegetables, and Fruits</StyledTableCell>
            <StyledTableCell>Healthy Protein</StyledTableCell>
            <StyledTableCell>Healthy Carbs</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <StyledTableRow>
            <StyledTableCell style={{ backgroundColor: "#d2f8d2" }}>
              <i
                class="fa-regular fa-circle-check"
                style={{ color: "#2c7722" }}
              ></i>
              Lettuce
              <br />
              <i
                class="fa-regular fa-circle-check"
                style={{ color: "#2c7722" }}
              ></i>
              Spinach
              <br />
              <i
                class="fa-regular fa-circle-check"
                style={{ color: "#2c7722" }}
              ></i>
              Cabbage
              <br />
              <i
                class="fa-regular fa-circle-check"
                style={{ color: "#2c7722" }}
              ></i>
              Cauliflower <br />
              <i
                class="fa-regular fa-circle-check"
                style={{ color: "#2c7722" }}
              ></i>
              Broccoli <br />
              <i
                class="fa-regular fa-circle-check"
                style={{ color: "#2c7722" }}
              ></i>
              Carrot
              <br />
              <i
                class="fa-regular fa-circle-check"
                style={{ color: "#2c7722" }}
              ></i>
              Cucumber
              <br />
              <i
                class="fa-regular fa-circle-check"
                style={{ color: "#2c7722" }}
              ></i>
              Avocado
              <br />
              <i
                class="fa-regular fa-circle-check"
                style={{ color: "#2c7722" }}
              ></i>
              Peppers
              <br />
              <i
                class="fa-regular fa-circle-check"
                style={{ color: "#2c7722" }}
              ></i>
              Eggplant
              <br />
              <i
                class="fa-regular fa-circle-check"
                style={{ color: "#2c7722" }}
              ></i>
              Onion
              <br />
              <i
                class="fa-regular fa-circle-check"
                style={{ color: "#2c7722" }}
              ></i>
              Tomatoe
              <br />
              <i
                class="fa-regular fa-circle-check"
                style={{ color: "#2c7722" }}
              ></i>
              Citrus Fruits
              <br />
              <i
                class="fa-regular fa-circle-check"
                style={{ color: "#2c7722" }}
              ></i>
              Apples
              <br />
              <i
                class="fa-regular fa-circle-check"
                style={{ color: "#2c7722" }}
              ></i>{" "}
              Pears
              <br />
            </StyledTableCell>
            <StyledTableCell style={{ backgroundColor: "#e8f4f8" }}>
              <i
                class="fa-regular fa-circle-check"
                style={{ color: "#2c7722" }}
              ></i>
              Fish
              <br />
              <i
                class="fa-regular fa-circle-check"
                style={{ color: "#2c7722" }}
              ></i>
              Lean Chicken <br />
              <i
                class="fa-regular fa-circle-check"
                style={{ color: "#2c7722" }}
              ></i>{" "}
              Beans <br />
              <i
                class="fa-regular fa-circle-check"
                style={{ color: "#2c7722" }}
              ></i>{" "}
              Lentils
              <br />
              <i
                class="fa-regular fa-circle-check"
                style={{ color: "#2c7722" }}
              ></i>
              Peas
              <br />
              <i
                class="fa-regular fa-circle-check"
                style={{ color: "#2c7722" }}
              ></i>
              Nuts and Seeds
              <br />
              <i
                class="fa-regular fa-circle-xmark"
                style={{ color: "#fa0057" }}
              ></i>
              Red Meat
            </StyledTableCell>
            <StyledTableCell style={{ backgroundColor: "#f2dbd4" }}>
              <i
                class="fa-regular fa-circle-check"
                style={{ color: "#2c7722" }}
              ></i>{" "}
              Whole-grain Mabele, Lebeleble, Mmidi
              <br />
              <i
                class="fa-regular fa-circle-check"
                style={{ color: "#2c7722" }}
              ></i>{" "}
              Brown Rice
              <br />
              <i
                class="fa-regular fa-circle-check"
                style={{ color: "#2c7722" }}
              ></i>{" "}
              Butternut (Squash)
              <br />
              <i
                class="fa-regular fa-circle-check"
                style={{ color: "#2c7722" }}
              ></i>{" "}
              Pumpkin
              <br />
              <i
                class="fa-regular fa-circle-check"
                style={{ color: "#2c7722" }}
              ></i>
              Sweet Potatoes (better than white potatoes!)
              <br />
              <i
                class="fa-regular fa-circle-xmark"
                style={{ color: "#fa0057" }}
              ></i>
              Juices and Fizzy Drinks
              <br />
              <i
                class="fa-regular fa-circle-xmark"
                style={{ color: "#fa0057" }}
              ></i>{" "}
              Sweets
              <br />
              <i
                class="fa-regular fa-circle-xmark"
                style={{ color: "#fa0057" }}
              ></i>{" "}
              Refined Grains
              <br />
              <i
                class="fa-regular fa-circle-xmark"
                style={{ color: "#fa0057" }}
              ></i>{" "}
              White Rice
              <br />
              <i
                class="fa-regular fa-circle-xmark"
                style={{ color: "#fa0057" }}
              ></i>
              White Bread
              <br />
            </StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
