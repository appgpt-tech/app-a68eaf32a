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
const FitnessActivitiesTitle = () => {
  const record = useRecordContext();
  return (
    <span>FitnessActivities {record ? `"${record.activityType}"` : ''}</span>
  );
};

export const FitnessActivitiesList = () => (
  <List actions={<ListActions />} filters={ResourceFilters}>
    <DatagridConfigurable>
      <TextField source="activityType" />
      <NumberField source="metric1" />
      <NumberField source="metric2" />
      <NumberField source="metric3" />
      <TextField source="caloriesBurnedFormula" />
      <EditButton />
    </DatagridConfigurable>
  </List>
);

export const FitnessActivitiesEdit = () => (
  <Edit title={<FitnessActivitiesTitle />}>
    <SimpleForm>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 5 }}>
        <Grid item xs={4}>
          <TextInput source="activityType" />
        </Grid>
        <Grid item xs={4}>
          <NumberInput source="metric1" />
        </Grid>
        <Grid item xs={4}>
          <NumberInput source="metric2" />
        </Grid>
        <Grid item xs={4}>
          <NumberInput source="metric3" />
        </Grid>
        <Grid item xs={4}>
          <TextInput source="caloriesBurnedFormula" />
        </Grid>
      </Grid>
    </SimpleForm>
  </Edit>
);

export const FitnessActivitiesCreate = () => (
  <Create>
    <SimpleForm>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 5 }}>
        <Grid item xs={4}>
          <TextInput source="activityType" />
        </Grid>
        <Grid item xs={4}>
          <NumberInput source="metric1" />
        </Grid>
        <Grid item xs={4}>
          <NumberInput source="metric2" />
        </Grid>
        <Grid item xs={4}>
          <NumberInput source="metric3" />
        </Grid>
        <Grid item xs={4}>
          <TextInput source="caloriesBurnedFormula" />
        </Grid>
      </Grid>
    </SimpleForm>
  </Create>
);

const ResourceFilters = [
  <TextInput source="q" label="Search" alwaysOn />,
  ,
  ,
  ,
  ,
  ,
];
