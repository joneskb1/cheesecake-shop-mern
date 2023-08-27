import { Rings } from 'react-loader-spinner';

export default function PageLoader() {
  return (
    <div style={{ height: '1000px' }}>
      <Rings
        height='500'
        width='500'
        color='#b87bc5'
        radius='6'
        wrapperStyle={{
          position: 'absolute',
          left: '50%',
          top: '10%',
          transform: 'translateX(-50%)',
        }}
        wrapperClass=''
        visible={true}
        ariaLabel='rings-loading'
      />
    </div>
  );
}
