//Source code generated by AppGPT (www.appgpt.tech)
import { GetListParams } from 'ra-core';
import postgrestRestProvider from '@promitheus/ra-data-postgrest';
import qs from 'qs';

const fieldConfig = {
  Users: [
    {
      field: 'username',
      datatype: 'String',
    },
    {
      field: 'password',
      datatype: 'String',
    },
    {
      field: 'fitnessGoals',
      datatype: 'Integer',
    },
    {
      field: 'email',
      datatype: 'String',
    },
    {
      field: 'age',
      datatype: 'Integer',
    },
    {
      field: 'weight',
      datatype: 'Real',
    },
    {
      field: 'height',
      datatype: 'Real',
    },
    {
      field: 'id',
      datatype: 'Integer',
    },
  ],
  FitnessActivities: [
    {
      field: 'activityType',
      datatype: 'String',
    },
    {
      field: 'metric1',
      datatype: 'Real',
    },
    {
      field: 'metric2',
      datatype: 'Real',
    },
    {
      field: 'metric3',
      datatype: 'Real',
    },
    {
      field: 'caloriesBurnedFormula',
      datatype: 'String',
    },
    {
      field: 'id',
      datatype: 'Integer',
    },
  ],
  Goals: [
    {
      field: 'goalID',
      datatype: 'Integer',
    },
    {
      field: 'userID',
      datatype: 'Integer',
    },
    {
      field: 'targetCalories',
      datatype: 'Integer',
    },
    {
      field: 'startDate',
      datatype: 'DateTime',
    },
    {
      field: 'endDate',
      datatype: 'DateTime',
    },
    {
      field: 'status',
      datatype: 'String',
    },
    {
      field: 'id',
      datatype: 'Integer',
    },
  ],
  ActivityRecords: [
    {
      field: 'recordID',
      datatype: 'Integer',
    },
    {
      field: 'userID',
      datatype: 'Integer',
    },
    {
      field: 'activityType',
      datatype: 'Integer',
    },
    {
      field: 'date',
      datatype: 'DateTime',
    },
    {
      field: 'metric1Value',
      datatype: 'Real',
    },
    {
      field: 'metric2Value',
      datatype: 'Real',
    },
    {
      field: 'metric3Value',
      datatype: 'Real',
    },
    {
      field: 'caloriesBurned',
      datatype: 'Real',
    },
    {
      field: 'id',
      datatype: 'Integer',
    },
  ],
};

export const customDataProvider = (apiUrl, options = {}) => {
  const baseDataProvider = postgrestRestProvider(apiUrl);
  return {
    ...baseDataProvider,
    getList: async (resource, params) => {
      if (params.filter && params.filter.q) {
        return await GetListQ(resource, params, apiUrl, baseDataProvider);
      } else {
        return baseDataProvider.getList(resource, params);
      }
    },
  };
};

async function GetListQ(
  resource,
  params: Partial<GetListParams> = {},
  apiUrl,
  baseDataProvider,
) {
  const { page, perPage } = params.pagination;
  const { field, order } = params.sort || {};
  const searchText = params.filter.q.toLowerCase();

  let filter = { or: '(id.eq.-1)' }; //return no data if resource has not been configured
  if (fieldConfig[resource]) {
    let searchConditions = fieldConfig[resource].reduce(
      (conditions, { field, datatype }) =>
        conditions +
        (datatype == 'String'
          ? field + '.ilike.%' + searchText + '%,'
          : //Todo: add support for searching other types
            ''),
      '',
    );
    filter = { or: '(' + searchConditions.slice(0, -1) + ')' };
  }
  let query = {
    offset: String((page - 1) * perPage),
    limit: String(perPage),
    // append filters
    ...filter,
  };

  if (field && order) {
    query.order = field + '.' + order.toLowerCase();
  }

  // add header that Content-Range is in returned header
  const options = {
    headers: new Headers({
      Accept: 'application/json',
      Prefer: 'count=exact',
      ...(params.meta?.headers || {}),
      //...useCustomSchema(config.schema, metaSchema, 'GET'),
    }),
  };

  const url = apiUrl + '/' + resource + '?' + qs.stringify(query);
  const response = await fetch(url, options);
  if (!response.ok) {
    const message = 'An error has occured: ' + response.status;
    throw new Error(message);
  }
  if (!response.headers.has('content-range')) {
    throw new Error(
      `The Content-Range header is missing in the HTTP Response. The postgREST data provider expects 
            responses for lists of resources to contain this header with the total number of results to build 
            the pagination. If you are using CORS, did you declare Content-Range in the Access-Control-Expose-Headers header?`,
    );
  }
  const json = await response.json();
  return {
    data: json,
    total: parseInt(response.headers.get('content-range').split('/').pop(), 10),
  };
}
