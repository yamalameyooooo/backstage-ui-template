import Literals from '@app/utils/Literals';
import packageJson from '@jsonPath';
import {
  Button,
  Modal,
  ModalVariant
} from '@patternfly/react-core';
import * as React from 'react';

const WhatsNew: React.FunctionComponent = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(true);

  const handleModalToggle = (_event: KeyboardEvent | React.MouseEvent) => {
    setIsModalOpen((prevIsModalOpen) => !prevIsModalOpen);
  };

  const header = "What's new in version "+ packageJson.version

  return (
    <React.Fragment>
      <Modal
        bodyAriaLabel="Scrollable modal content"
        tabIndex={0}
        variant={ModalVariant.small}
        title={header}
        isOpen={isModalOpen}
        onClose={handleModalToggle}
        width="50%"
        actions={[
          <Button key="confirm" variant="primary" onClick={handleModalToggle}>
            Confirm
          </Button>,
        ]}
      >
        {Literals.DUMMY_TEXT}
        <br />
        <br />
        {Literals.DUMMY_TEXT}
        <br />
        <br />
        {Literals.DUMMY_TEXT}
        <br />
        <br />
        {Literals.DUMMY_TEXT}
      </Modal>
    </React.Fragment>
  );
};


export { WhatsNew };
