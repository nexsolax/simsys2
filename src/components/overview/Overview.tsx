import React, { useState } from 'react';
import {
  Typography,
  Grid2,
  Box,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  List,
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import { ResponsivePie } from '@nivo/pie';
import { ResponsiveBar } from '@nivo/bar';

const data = [
  {
    id: 'javascript',
    label: 'javascript',
    value: 287,
    color: 'hsl(12, 70%, 50%)',
  },
  {
    id: 'erlang',
    label: 'erlang',
    value: 351,
    color: 'hsl(130, 70%, 50%)',
  },
  {
    id: 'scala',
    label: 'scala',
    value: 345,
    color: 'hsl(128, 70%, 50%)',
  },
  {
    id: 'java',
    label: 'java',
    value: 126,
    color: 'hsl(149, 70%, 50%)',
  },
];

const data1 = [
  {
    country: 'AD',
    'hot dog': 138,
    'hot dogColor': 'hsl(302, 70%, 50%)',
    burger: 135,
    burgerColor: 'hsl(19, 70%, 50%)',
    sandwich: 148,
    sandwichColor: 'hsl(106, 70%, 50%)',
    kebab: 8,
    kebabColor: 'hsl(176, 70%, 50%)',
    fries: 42,
    friesColor: 'hsl(299, 70%, 50%)',
    donut: 101,
    donutColor: 'hsl(300, 70%, 50%)',
  },
  {
    country: 'AE',
    'hot dog': 61,
    'hot dogColor': 'hsl(285, 70%, 50%)',
    burger: 159,
    burgerColor: 'hsl(341, 70%, 50%)',
    sandwich: 98,
    sandwichColor: 'hsl(322, 70%, 50%)',
    kebab: 93,
    kebabColor: 'hsl(243, 70%, 50%)',
    fries: 199,
    friesColor: 'hsl(223, 70%, 50%)',
    donut: 179,
    donutColor: 'hsl(324, 70%, 50%)',
  },
  {
    country: 'AF',
    'hot dog': 183,
    'hot dogColor': 'hsl(98, 70%, 50%)',
    burger: 171,
    burgerColor: 'hsl(337, 70%, 50%)',
    sandwich: 160,
    sandwichColor: 'hsl(104, 70%, 50%)',
    kebab: 4,
    kebabColor: 'hsl(47, 70%, 50%)',
    fries: 53,
    friesColor: 'hsl(191, 70%, 50%)',
    donut: 62,
    donutColor: 'hsl(346, 70%, 50%)',
  },
  {
    country: 'AG',
    'hot dog': 183,
    'hot dogColor': 'hsl(159, 70%, 50%)',
    burger: 127,
    burgerColor: 'hsl(262, 70%, 50%)',
    sandwich: 119,
    sandwichColor: 'hsl(342, 70%, 50%)',
    kebab: 178,
    kebabColor: 'hsl(309, 70%, 50%)',
    fries: 113,
    friesColor: 'hsl(304, 70%, 50%)',
    donut: 56,
    donutColor: 'hsl(283, 70%, 50%)',
  },
  {
    country: 'AI',
    'hot dog': 148,
    'hot dogColor': 'hsl(84, 70%, 50%)',
    burger: 61,
    burgerColor: 'hsl(334, 70%, 50%)',
    sandwich: 123,
    sandwichColor: 'hsl(111, 70%, 50%)',
    kebab: 98,
    kebabColor: 'hsl(305, 70%, 50%)',
    fries: 189,
    friesColor: 'hsl(171, 70%, 50%)',
    donut: 49,
    donutColor: 'hsl(273, 70%, 50%)',
  },
  {
    country: 'AL',
    'hot dog': 89,
    'hot dogColor': 'hsl(38, 70%, 50%)',
    burger: 50,
    burgerColor: 'hsl(233, 70%, 50%)',
    sandwich: 10,
    sandwichColor: 'hsl(76, 70%, 50%)',
    kebab: 22,
    kebabColor: 'hsl(11, 70%, 50%)',
    fries: 79,
    friesColor: 'hsl(307, 70%, 50%)',
    donut: 26,
    donutColor: 'hsl(221, 70%, 50%)',
  },
  {
    country: 'AM',
    'hot dog': 191,
    'hot dogColor': 'hsl(76, 70%, 50%)',
    burger: 83,
    burgerColor: 'hsl(323, 70%, 50%)',
    sandwich: 62,
    sandwichColor: 'hsl(204, 70%, 50%)',
    kebab: 75,
    kebabColor: 'hsl(40, 70%, 50%)',
    fries: 145,
    friesColor: 'hsl(123, 70%, 50%)',
    donut: 186,
    donutColor: 'hsl(80, 70%, 50%)',
  },
];

interface Column {
  id: 'name' | 'code' | 'population' | 'size' | 'density';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
  {
    id: 'population',
    label: 'Population',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'size',
    label: 'Size\u00a0(km\u00b2)',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'density',
    label: 'Density',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toFixed(2),
  },
];

interface Data {
  name: string;
  code: string;
  population: number;
  size: number;
  density: number;
}

function createData(name: string, code: string, population: number, size: number): Data {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData('India', 'IN', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
  createData('Italy', 'IT', 60483973, 301340),
  createData('United States', 'US', 327167434, 9833520),
  createData('Canada', 'CA', 37602103, 9984670),
  createData('Australia', 'AU', 25475400, 7692024),
  createData('Germany', 'DE', 83019200, 357578),
  createData('Ireland', 'IE', 4857000, 70273),
  createData('Mexico', 'MX', 126577691, 1972550),
  createData('Japan', 'JP', 126317000, 377973),
  createData('France', 'FR', 67022000, 640679),
  createData('United Kingdom', 'GB', 67545757, 242495),
  createData('Russia', 'RU', 146793744, 17098246),
  createData('Nigeria', 'NG', 200962417, 923768),
  createData('Brazil', 'BR', 210147125, 8515767),
];

const Overview: React.FC = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  return (
    <Grid2 container alignItems={'center'} spacing={3}>
      <Grid2 size={4}>
        <Paper>
          <Typography fontSize={'16px'} variant='h6'>
            Total active users
          </Typography>
          <Box sx={{ py: 2 }}>
            <Typography sx={{ fontFamily: 'Barlow' }} variant='h3'>
              18,765
            </Typography>
          </Box>
          <Typography sx={{ color: 'var(--palette-text-secondary)' }} variant='caption'>
            last 7 days
          </Typography>
        </Paper>
      </Grid2>
      <Grid2 size={4}>
        <Paper>
          <Typography variant='h6'>Total installed</Typography>
          <Box sx={{ py: 2 }}>
            <Typography sx={{ fontFamily: 'Barlow' }} variant='h3'>
              4,876
            </Typography>
          </Box>
          <Typography sx={{ color: 'var(--palette-text-secondary)' }} variant='caption'>
            last 7 days
          </Typography>
        </Paper>
      </Grid2>
      <Grid2 size={4}>
        <Paper>
          <Typography variant='h6'>Total downloads</Typography>
          <Box sx={{ py: 2 }}>
            <Typography sx={{ fontFamily: 'Barlow' }} variant='h3'>
              678
            </Typography>
          </Box>
          <Typography sx={{ color: 'var(--palette-text-secondary)' }} variant='caption'>
            last 7 days
          </Typography>
        </Paper>
      </Grid2>

      <Grid2 size={4} alignSelf={'flex-start'}>
        <Paper>
          <Typography variant='h5' mb={4}>
            Sale by gender
          </Typography>
          <Box sx={{ height: 260 }}>
            <ResponsivePie
              data={data}
              margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
              innerRadius={0.5}
              padAngle={2}
              cornerRadius={7}
              activeOuterRadiusOffset={8}
              borderWidth={1}
              borderColor={{
                from: 'color',
                modifiers: [['darker', 0.2]],
              }}
              enableArcLinkLabels={false}
              arcLinkLabelsSkipAngle={10}
              arcLinkLabelsTextColor='#333333'
              arcLinkLabelsThickness={2}
              arcLinkLabelsColor={{ from: 'color' }}
              enableArcLabels={false}
              arcLabelsSkipAngle={10}
              arcLabelsTextColor={{
                from: 'color',
                modifiers: [['darker', 2]],
              }}
              defs={[
                {
                  id: 'dots',
                  type: 'patternDots',
                  background: 'inherit',
                  color: 'rgba(255, 255, 255, 0.3)',
                  size: 4,
                  padding: 1,
                  stagger: true,
                },
                {
                  id: 'lines',
                  type: 'patternLines',
                  background: 'inherit',
                  color: 'rgba(255, 255, 255, 0.3)',
                  rotation: -45,
                  lineWidth: 6,
                  spacing: 10,
                },
              ]}
              fill={[
                {
                  match: {
                    id: 'ruby',
                  },
                  id: 'dots',
                },
                {
                  match: {
                    id: 'c',
                  },
                  id: 'dots',
                },
                {
                  match: {
                    id: 'go',
                  },
                  id: 'dots',
                },
                {
                  match: {
                    id: 'python',
                  },
                  id: 'dots',
                },
                {
                  match: {
                    id: 'scala',
                  },
                  id: 'lines',
                },
                {
                  match: {
                    id: 'lisp',
                  },
                  id: 'lines',
                },
                {
                  match: {
                    id: 'elixir',
                  },
                  id: 'lines',
                },
                {
                  match: {
                    id: 'javascript',
                  },
                  id: 'lines',
                },
              ]}
              // legends={[
              //   {
              //     anchor: 'bottom',
              //     direction: 'row',
              //     justify: false,
              //     translateX: 0,
              //     translateY: 0,
              //     itemsSpacing: 0,
              //     itemWidth: 50,
              //     itemHeight: 18,
              //     itemTextColor: '#999',
              //     itemDirection: 'left-to-right',
              //     itemOpacity: 1,
              //     symbolSize: 12,
              //     symbolShape: 'circle',
              //     effects: [
              //       {
              //         on: 'hover',
              //         style: {
              //           itemTextColor: '#000',
              //         },
              //       },
              //     ],
              //   },
              // ]}
            />
          </Box>
        </Paper>
      </Grid2>
      <Grid2 size={8}>
        <Paper>
          <Typography variant='h5'>Yearly sales</Typography>
          <Typography variant='subtitle1'>(+43%) than last year</Typography>
          <Box sx={{ height: 280 }}>
            <ResponsiveBar
              data={data1}
              keys={['hot dog', 'burger', 'sandwich', 'kebab', 'fries', 'donut']}
              indexBy='country'
              margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
              padding={0.3}
              valueScale={{ type: 'linear' }}
              indexScale={{ type: 'band', round: true }}
              colors={{ scheme: 'nivo' }}
              defs={[
                {
                  id: 'dots',
                  type: 'patternDots',
                  background: 'inherit',
                  color: '#38bcb2',
                  size: 4,
                  padding: 1,
                  stagger: true,
                },
                {
                  id: 'lines',
                  type: 'patternLines',
                  background: 'inherit',
                  color: '#eed312',
                  rotation: -45,
                  lineWidth: 6,
                  spacing: 10,
                },
              ]}
              fill={[
                {
                  match: {
                    id: 'fries',
                  },
                  id: 'dots',
                },
                {
                  match: {
                    id: 'sandwich',
                  },
                  id: 'lines',
                },
              ]}
              borderColor={{
                from: 'color',
                modifiers: [['darker', 1.6]],
              }}
              axisTop={null}
              axisRight={null}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'country',
                legendPosition: 'middle',
                legendOffset: 32,
                truncateTickAt: 0,
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'food',
                legendPosition: 'middle',
                legendOffset: -40,
                truncateTickAt: 0,
              }}
              labelSkipWidth={12}
              labelSkipHeight={12}
              labelTextColor={{
                from: 'color',
                modifiers: [['darker', 1.6]],
              }}
              legends={[
                {
                  dataFrom: 'keys',
                  anchor: 'bottom-right',
                  direction: 'column',
                  justify: false,
                  translateX: 120,
                  translateY: 0,
                  itemsSpacing: 2,
                  itemWidth: 100,
                  itemHeight: 20,
                  itemDirection: 'left-to-right',
                  itemOpacity: 0.85,
                  symbolSize: 20,
                  effects: [
                    {
                      on: 'hover',
                      style: {
                        itemOpacity: 1,
                      },
                    },
                  ],
                },
              ]}
              role='application'
              ariaLabel='Nivo bar chart demo'
              barAriaLabel={(e) => e.id + ': ' + e.formattedValue + ' in country: ' + e.indexValue}
            />
          </Box>
        </Paper>
      </Grid2>

      <Grid2 size={8}>
        <Paper sx={{ px: 0 }}>
          <Typography ml={3} mb={3} variant='h5'>
            New invoice
          </Typography>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label='sticky table'>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      sx={{
                        minWidth: column.minWidth,
                        backgroundColor: 'var(--palette-background-neutral)',
                        color: 'var(--palette-text-secondary)',
                        fontSize: '13px',
                        fontWeight: 600,
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                  return (
                    <TableRow hover role='checkbox' tabIndex={-1} key={row.code}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid2>
      <Grid2 size={4} alignSelf={'flex-start'}>
        <Paper>
          <Typography variant='h5'>Top seller</Typography>

          <List>
            <ListItem sx={{ px: 0 }}>
              <ListItemAvatar>
                <Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' />
              </ListItemAvatar>
              <ListItemText
                slotProps={{
                  primary: {
                    fontSize: '14px',
                    fontWeight: 600,
                    color: 'var(--palette-text-primary)',
                  },
                  secondary: {
                    fontSize: '12px',
                    color: 'var(--palette-text-secondary)',
                  },
                }}
                primary='Jayvion Simon'
                secondary='9.91k'
              />
            </ListItem>
            <ListItem sx={{ px: 0 }}>
              <ListItemAvatar>
                <Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' />
              </ListItemAvatar>
              <ListItemText
                slotProps={{
                  primary: {
                    fontSize: '14px',
                    fontWeight: 600,
                    color: 'var(--palette-text-primary)',
                  },
                  secondary: {
                    fontSize: '12px',
                    color: 'var(--palette-text-secondary)',
                  },
                }}
                primary='Jayvion Simon'
                secondary='9.91k'
              />
            </ListItem>
            <ListItem sx={{ px: 0 }}>
              <ListItemAvatar>
                <Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' />
              </ListItemAvatar>
              <ListItemText
                slotProps={{
                  primary: {
                    fontSize: '14px',
                    fontWeight: 600,
                    color: 'var(--palette-text-primary)',
                  },
                  secondary: {
                    fontSize: '12px',
                    color: 'var(--palette-text-secondary)',
                  },
                }}
                primary='Jayvion Simon'
                secondary='9.91k'
              />
            </ListItem>
            <ListItem sx={{ px: 0 }}>
              <ListItemAvatar>
                <Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' />
              </ListItemAvatar>
              <ListItemText
                slotProps={{
                  primary: {
                    fontSize: '14px',
                    fontWeight: 600,
                    color: 'var(--palette-text-primary)',
                  },
                  secondary: {
                    fontSize: '12px',
                    color: 'var(--palette-text-secondary)',
                  },
                }}
                primary='Jayvion Simon'
                secondary='9.91k'
              />
            </ListItem>
            <ListItem sx={{ px: 0 }}>
              <ListItemAvatar>
                <Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' />
              </ListItemAvatar>
              <ListItemText
                slotProps={{
                  primary: {
                    fontSize: '14px',
                    fontWeight: 600,
                    color: 'var(--palette-text-primary)',
                  },
                  secondary: {
                    fontSize: '12px',
                    color: 'var(--palette-text-secondary)',
                  },
                }}
                primary='Jayvion Simon'
                secondary='9.91k'
              />
            </ListItem>
          </List>
        </Paper>
      </Grid2>
    </Grid2>
  );
};

export default Overview;
