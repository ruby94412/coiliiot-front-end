import {useState} from 'react';
import ErrorModal from '../common/ErrorModal'; 
import Connection from './Connection';
import Read from './Read';
import Write from './Write';
// import DataLog from './DataLog';
import {initWsClient} from '../utilities/websocket';

const ControlPanel = () => {
  const [wsClient, setWsClient] = useState(null);
  const [wsMessage, setWsMessage] = useState('');
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const handleWsConnection = connected => {
    if (connected) {
      wsClient?.close();
      return false;
    } else {
      const client = initWsClient({
        setWsClient,
        setWsMessage,
        setIsErrorModalOpen,
      });
      return client;
    }
  }

  return (
    <div>
        <Connection handleWsConnection={handleWsConnection} />
        {
          wsClient
            && <>
              <Read
                wsMessage={wsMessage}
              />
              <Write wsMessage={wsMessage} wsClient={wsClient} />
              {/* <DataLog
                currentReadingData={currentReadingData}
              /> */}
            </>
        }
        <ErrorModal
          errorMessage="连接失败"
          isErrorModalOpen={isErrorModalOpen}
          onClose={() => {setIsErrorModalOpen(false);}}
        />
    </div>
  );
};

export default ControlPanel;
