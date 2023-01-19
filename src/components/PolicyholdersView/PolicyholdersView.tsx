import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Divider } from '@mui/material';
import InfoTable from '../InfoTable';
import CheckList from '../CheckList';
import postPolicyholderPayload from '../../constants/postPolicyholderPayload';
import tasks from '../../constants/tasks';

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
  const [policyholders, setPolicyholders] = useState<TPolicyholder[]>([])
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
      setPolicyholders(policyholders);
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
            key: 'Phone Number',
            value: policyholder.phoneNumber
          },
          {
            key: 'Primary Policyholder',
            value: policyholder.isPrimary ? 'Yes' : 'No'
          }
        ]
        return (
          <InfoTable 
            key={index}
            sx={{ marginBottom: '16px' }}
            header={`Policy Holder ${index + 1}`}
            rows={rows}
          />
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
      <Divider sx={{ marginY: '48px' }} />
      <Box sx={{ paddingBottom: '16px' }}>
        <Box sx={{ textAlign: 'center' }}>
          <img
            src="https://media.giphy.com/media/Yx5ns1mSPBle0/giphy.gif"
            alt="A cool dog typing on a laptop"
            style={{ maxWidth: '100%', paddingBottom: '16px' }}
          />
        </Box>
        <CheckList header="Remaining To-dos" tasks={tasks} />
      </Box>
    </Box>
  );
}

export default PolicyholdersView;
