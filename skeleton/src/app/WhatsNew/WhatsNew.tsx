import Literals from '@app/utils/Literals';
import packageJson from '@jsonPath';
import { Button, Modal, ModalVariant } from '@patternfly/react-core';
import * as React from 'react';

interface IWhatsNewProp {
  confirm: ()=>void
}

const WhatsNew = (props: IWhatsNewProp) => {
  const [isModalOpen, setIsModalOpen] = React.useState(true);

  const handleModalToggle = (_event: KeyboardEvent | React.MouseEvent) => {
    props.confirm();
    setIsModalOpen((prevIsModalOpen) => !prevIsModalOpen);
  };

  const header = "What's new in Version " + packageJson.version;

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
        {Literals.WHATS_NEW_CONTENT}
      </Modal>
    </React.Fragment>
  );
};

export { WhatsNew };

