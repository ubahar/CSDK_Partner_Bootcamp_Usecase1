import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import {
  SisenseContextProvider,
  ThemeProvider,
  DashboardWidget,
  MemberFilterTile,
  ChartWidget,
  Table,
  ExecuteQuery,
} from "@sisense/sdk-ui";
import * as DM from "../../dataModels/sample-healthcare";
import { measureFactory, Filter, Measure } from "@sisense/sdk-data";
import { useState } from "react";
import { Button, CssBaseline, Stack, Container } from "@mui/material";
import { transformData } from "./transformToDataGrid";
import { DataGrid } from "@mui/x-data-grid";

// Main page (exported)
const PageContent = () => {
  // set colors
  const bgColor: string = "#fff";
  const textColor: string = "rgba(0, 0, 0, 0.6)";

  // create customised MUI theme
  const muiTheme = createTheme({
    typography: {
      fontFamily: ' "Roboto", "Helvetica", "Arial", sans-serif',
    },
    palette: {
      mode: "light",
    },
    components: {
      // Name of the component
      MuiGrid: {
        styleOverrides: {
          // Name of the slot
          root: {
            backgroundColor: "#dbdde1",
          },
        },
      },
    },
  });

  return (
    <SisenseContextProvider
      url="https://guy.sisensepoc.com" // replace with Sisense env URL
      token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjIyMGU2ZDg2MzMwZGEwMDFhZmVjMjk1IiwiYXBpU2VjcmV0IjoiM2E4MmQzZjAtMWI4OS0yMzJmLWY3MDUtYjFiZDU2NjU5OWY5IiwiYWxsb3dlZFRlbmFudHMiOlsiNjIyMGU2ZDg2MzMwZGEwMDFhZmVjMmEyIl0sInRlbmFudElkIjoiNjIyMGU2ZDg2MzMwZGEwMDFhZmVjMmEyIn0.g_W6c8ZJ749_BeNav75SYbk1qJYpRtWbPeOmcm6JBdk"
      appConfig={{
        queryCacheConfig: { enabled: true },
      }}
    >
      <MuiThemeProvider theme={muiTheme}>
        <CssBaseline />
        {/* set sisense Theme provider to use dynamic colors set above */}
        <ThemeProvider
          theme={{
            typography: {
              fontFamily: "Verdana",
              primaryTextColor: textColor,
            },
            palette: {
              variantColors: [
                "#4361ee",
                "#f72585",
                "#7209b7",
                "#4cc9f0",
                "#3a0ca3",
              ],
            },
            general: {
              brandColor: "#36a9fe",
              backgroundColor: bgColor,
              primaryButtonTextColor: "#000",
            },
            chart: {
              backgroundColor: "transparent",
              textColor: textColor,
            },
          }}
        >
          <Grid height={"100%"}>
            <Stack
              direction="row"
              alignItems="center"
              paddingLeft={"1.5rem"}
              paddingTop={"0.5rem"}
            />
            <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
              <PageLayout />
            </Container>
          </Grid>
        </ThemeProvider>
      </MuiThemeProvider>
    </SisenseContextProvider>
  );
};

export default PageContent;

// the page component layout
const PageLayout = () => {
  const [yearFilter, setYearFilter] = useState<Filter | null>(null);
  const [timeLevel, setTimeLevel] = useState("Months");

  // verify all filters passed are defined
  const activeFilters: Filter[] = [yearFilter].filter((f) => {
    if (f) return f;
  }) as Filter[];

  // create custom formula to calculate 'Average stay in days'
  const avgStay = measureFactory.customFormula(
    "Average stay in days",
    "Avg(DDiff([dischargeTime],[admissionTime]))",
    {
      dischargeTime: DM.Admissions.Discharge_Time.Days,
      admissionTime: DM.Admissions.Admission_Time.Days,
    }
  );

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Typography variant="h5" component="div" paddingBottom={"1rem"}>
          Healthcare Data
        </Typography>
        <MemberFilterTile
          dataSource={DM.DataSource}
          title="Years"
          attribute={DM.Admissions.Admission_Time.Years}
          filter={yearFilter}
          onChange={setYearFilter}
        />
      </Grid>

      {/* Embedded indictors */}
      <Grid item xs={4} md={4} lg={4}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "row",
          }}
        >
          <DashboardWidget
            widgetOid={"6617f5a012f7a10033d9f52c"}
            dashboardOid={"6617f5a012f7a10033d9f529"}
            filters={[]}
          />
        </Paper>
      </Grid>
      <Grid item xs={4} md={4} lg={4}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "row",
          }}
        >
          <DashboardWidget
            widgetOid={"6617f5a012f7a10033d9f52d"}
            dashboardOid={"6617f5a012f7a10033d9f529"}
            filters={activeFilters}
          />
        </Paper>
      </Grid>
      <Grid item xs={4} md={4} lg={4}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "row",
          }}
        >
          <DashboardWidget
            widgetOid={"6617f5a012f7a10033d9f52e"}
            dashboardOid={"6617f5a012f7a10033d9f529"}
            filters={activeFilters}
          />
        </Paper>
      </Grid>

      <Grid item xs={12} md={12} lg={12}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "",
          }}
        >
          {/* time level control buttons */}
          <Stack
            spacing={2}
            direction="row"
            style={{ marginBottom: "5px" }}
            justifyContent={"center"}
            width={"100%"}
          >
            <Button
              variant="contained"
              color={"primary"}
              onClick={() => {
                setTimeLevel("Weeks");
              }}
            >
              Weeks
            </Button>
            <Button
              variant="contained"
              color={"primary"}
              onClick={() => {
                setTimeLevel("Months");
              }}
            >
              Months
            </Button>
            <Button
              variant="contained"
              color={"primary"}
              onClick={() => {
                setTimeLevel("Years");
              }}
            >
              Years
            </Button>
          </Stack>
        </Paper>
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <ChartWidget
            title={`TOTAL PATIENT ADMISSIONS & LENGTH OF STAY (${timeLevel})`}
            dataSource={DM.DataSource}
            chartType={"column"}
            dataOptions={{
              category: [DM.Admissions.Admission_Time[timeLevel]],
              value: [
                avgStay,
                {
                  column: measureFactory.count(DM.Admissions.Patient_ID),
                  showOnRightAxis: true,
                  chartType: "line",
                  title: "Tot. Patient Admissions",
                },
              ],
              breakBy: [],
            }}
            filters={activeFilters}
            styleOptions={{
              legend: {
                enabled: true,
                position: "top",
              },
            }}
          />
        </Paper>
      </Grid>
      <Grid item xs={6} md={6} lg={6}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: "510px",
          }}
        >
          Sisense Table
          <Table
            dataSet={DM.DataSource}
            dataOptions={{
              columns: [
                {
                  column: DM.Admissions.Admission_Time[timeLevel],
                  name: "Date",
                },
                avgStay,
                {
                  column: measureFactory.count(DM.Admissions.Patient_ID),
                  showOnRightAxis: true,
                  chartType: "line",
                  title: "Tot. Patient Admissions",
                },
              ],
            }}
            filters={activeFilters}
          />
        </Paper>
      </Grid>
      <Grid item xs={6} md={6} lg={6}>
        <ExecuteQuery
          dataSource={DM.DataSource}
          dimensions={[DM.Admissions.Admission_Time[timeLevel]]}
          measures={[
            avgStay as Measure,
            measureFactory.count(
              DM.Admissions.Patient_ID,
              "Patient admissions"
            ),
          ]}
          filters={activeFilters}
        >
          {({ data }) => {
            if (data) {
              // transform the sisense data into MUI datagrid format
              const transformedData = transformData(data, 0);
              return (
                <>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    MUI DataGrid
                    <DataGrid
                      rows={transformedData.rows}
                      columns={transformedData.columns}
                      density="compact"
                      initialState={{
                        pagination: {
                          paginationModel: { page: 0, pageSize: 10 },
                        },
                      }}
                      pageSizeOptions={[5, 10]}
                    />
                  </Paper>
                </>
              );
            }
            return null;
          }}
        </ExecuteQuery>
      </Grid>
    </Grid>
  );
};
