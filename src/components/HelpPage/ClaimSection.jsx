import Container from '../../container/Container';
import React from 'react';
import TitleV2 from '../common/TitleV2';
import ClaimCard from './ClaimSection/ClaimCard';


const claimData = [
    {
        id:1,
        title:'File Claim',
        claim:'To begin the claims process you will select the appropriate online form below and fill out all required fields. All claims must be filed within 10 days of the delivery date.',
    },
    {
        id:2,
        title:'Claim Reviewed',
        claim:'A claims specialist will review and file your claim within 1-2 business days. If additional information is needed, a claims specialist will contact you by phone or email. Otherwise, you will be made aware of your claim being filed.',
    },
    {
        id:3,
        title:'Claim Filed',
        claim:'Once your claim has been reviewed and filed, you can expect to receive an approval or denial within 14 business days. Once the claim has been filed, it cannot be altered. All decisions determined by our 3rd party insurance carrier are final.',
    },
    {
        id:4,
        title:'Claim Approved',
        claim:'Once your claim has been approved we will mail your reimbursement check via USPS. The check will be sent to the address provided in your claims submission.',
    },
]

const ClaimSection = () => {
  return (
    <section className='pt-[100px]'>
      <Container>
        <div className='mb-6'>
            <TitleV2 subTitle="Claim" title="Claim" />
        </div>
        <div>
            {
                claimData?.map((item) => (
                    <ClaimCard key={item?.id} item={item} />
                ))
            }
        </div>
      </Container>
    </section>
  );
};

export default ClaimSection;