import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import alertIcon from "../assets/modal-information-icon.svg";

const Alert = ({ isOpen, setIsOpen }) => {
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Transition
        appear
        show={isOpen}
        as={Fragment}
        data-cy="modal-information"
      >
        <Dialog
          as="div"
          className="relative z-10"
          onClose={closeModal}
          data-cy="modal-information"
        >
          <Transition.Child as={Fragment}>
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child as={Fragment}>
                <Dialog.Panel className="w-[490px] h-[58px] px-[30px] overflow-hidden rounded-2xl bg-white shadow-xl">
                  <div className="flex h-full items-center gap-3">
                    <div data-cy="modal-information-icon">
                      <img src={alertIcon} alt="alert-icon" />
                    </div>
                    <p>Activity berhasil dihapus</p>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Alert;
