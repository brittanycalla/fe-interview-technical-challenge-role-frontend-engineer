import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box } from '@mui/material';
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

function PolicyholdersView() {
  const [policyholders, setPolicyholders] = useState([] as TPolicyholder[])
  const getPolicyholders = async () => {
    try {
      const response = await axios.get('https://fe-interview-technical-challenge-api-git-main-sure.vercel.app/api/policyholders');
      const policyholders = response.data.policyHolders;
      setPolicyholders(policyholders);
    }
    catch (error) {
      console.log(`Error: ${error}`)
    }
  }

  useEffect(() => {
    getPolicyholders()
  }, [])

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
    </Box>
  );
}

export default PolicyholdersView;
