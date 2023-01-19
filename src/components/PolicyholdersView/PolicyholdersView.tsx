import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button } from '@mui/material';
import InfoTable from '../InfoTable';

type TPolicyholder = {
  name: string;
  age: number;
  address: {
    line1: string;
    line2: string | undefined;
    city: string;
    state: string;
    postalCode: string;
  };
  phoneNumber: string;
  isPrimary?: boolean;
}

const postPolicyholderPayload = {
  "name": "Elaine Benes",
  "age": 60,
  "address": {
      "line1": "16 West 75th Street",
      "line2": "APT 2G",
      "city": "New York",
      "state": "NY",
      "postalCode": "10023",
  },
  "phoneNumber": "1-234-867-5309",
  "isPrimary": false
}

function PolicyholdersView() {
  const [policyholders, setPolicyholders] = useState([] as TPolicyholder[])
  const getPolicyholders = async () => {
    try {
      const response = await axios.get('https://fe-interview-technical-challenge-api-git-main-sure.vercel.app/api/policyholders');
      const policyholders = response.data.policyHolders;
      setPolicyholders(policyholders);
    }
    catch (error) {
      console.log(`Error: ${error}`);
    }
  }

  useEffect(() => {
    getPolicyholders();
  }, [])

  const handlePostPolicyholder = async () => {
    try {
      const response = await axios.post('https://fe-interview-technical-challenge-api-git-main-sure.vercel.app/api/policyholders', postPolicyholderPayload);
      const policyholders = response.data.policyHolders;
      console.log(policyholders);
    }
    catch (error) {
      console.log(`Error: ${error}`);
    }
  }

  return (
    <Box>
      {policyholders.map((policyholder: TPolicyholder, index: number) => {
        const rows = [
          {
            key: 'Name',
            value: policyholder.name
          },
          {
            key: 'Age',
            value: policyholder.age,
          },
          {
            key: 'Address',
            value: `${policyholder.address.line1} ${policyholder.address.line2 || ''}\n${policyholder.address.city}, ${policyholder.address.state} ${policyholder.address.postalCode}`
          },
          {
            key: 'Phone number',
            value: policyholder.phoneNumber
          },
          {
            key: 'Primary policyholder',
            value: policyholder.isPrimary ? 'Yes' : 'No'
          }
        ]
        return (
          <InfoTable key={index} header={`Policy Holder ${index + 1}`} rows={rows} />
        )
      })}
      <Box
        sx={{
          paddingTop: '16px',
          textAlign: 'center',
        }}
      >
        <Button
          onClick={handlePostPolicyholder}
          variant="contained"
          color="primary"
          size="large"
        >
          Add a policyholder
        </Button>
      </Box>
    </Box>
  );
}

export default PolicyholdersView;
