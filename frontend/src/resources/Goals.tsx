//Source code generated by AppGPT (www.appgpt.tech)
import {
  Datagrid,
  List,
  EditButton,
  Edit,
  SimpleForm,
  Create,
  SelectColumnsButton,
  DatagridConfigurable,
  TopToolbar,
  CreateButton,
  ExportButton,
  FilterButton,
  //Field controls
  BooleanField,
  DateField,
  EmailField,
  ImageField,
  NumberField,
  ReferenceField,
  TextField,
  UrlField,
  //Input controls
  BooleanInput,
  DateInput,
  EmailInput,
  ImageInput,
  NumberInput,
  ReferenceInput,
  TextInput,
  UrlInput,
  PasswordInput,
} from 'react-admin';
import { useRecordContext } from 'react-admin';
import { Grid } from '@mui/material';
const ReadOnlyPasswordField = ({ record, source }) => {
  // You can customize the way you display the password here, e.g., mask it with asterisks
  const maskedPassword = '********';

  return <span>{maskedPassword}</span>;
};
const ListActions = () => (
  <TopToolbar>
    <FilterButton />
    <CreateButton />
    <ExportButton />
    <SelectColumnsButton />
  </TopToolbar>
);
const GoalsTitle = () => {
  const record = useRecordContext();
  return <span>Goals {record ? `"${record.goalID}"` : ''}</span>;
};

export const GoalsList = () => (
  <List actions={<ListActions />} filters={ResourceFilters}>
    <DatagridConfigurable>
      <NumberField source="goalID" />
      <ReferenceField source="userID" reference="Users" />
      <NumberField source="targetCalories" />
      <DateField source="startDate" />
      <DateField source="endDate" />
      <TextField source="status" />
      <EditButton />
    </DatagridConfigurable>
  </List>
);

export const GoalsEdit = () => (
  <Edit title={<GoalsTitle />}>
    <SimpleForm>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 5 }}>
        <Grid item xs={4}>
          <NumberInput source="goalID" />
        </Grid>
        <Grid item xs={4}>
          <ReferenceInput source="userID" reference="Users" />
        </Grid>
        <Grid item xs={4}>
          <NumberInput source="targetCalories" />
        </Grid>
        <Grid item xs={4}>
          <DateInput source="startDate" />
        </Grid>
        <Grid item xs={4}>
          <DateInput source="endDate" />
        </Grid>
        <Grid item xs={4}>
          <TextInput source="status" />
        </Grid>
      </Grid>
    </SimpleForm>
  </Edit>
);

export const GoalsCreate = () => (
  <Create>
    <SimpleForm>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 5 }}>
        <Grid item xs={4}>
          <NumberInput source="goalID" />
        </Grid>
        <Grid item xs={4}>
          <ReferenceInput source="userID" reference="Users" />
        </Grid>
        <Grid item xs={4}>
          <NumberInput source="targetCalories" />
        </Grid>
        <Grid item xs={4}>
          <DateInput source="startDate" />
        </Grid>
        <Grid item xs={4}>
          <DateInput source="endDate" />
        </Grid>
        <Grid item xs={4}>
          <TextInput source="status" />
        </Grid>
      </Grid>
    </SimpleForm>
  </Create>
);

const ResourceFilters = [
  <TextInput source="q" label="Search" alwaysOn />,
  ,
  <ReferenceInput source="userID" label="userID" reference="Users" alwaysOn />,
  ,
  ,
  ,
  ,
];
