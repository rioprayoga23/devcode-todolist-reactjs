import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import modalDeleteIcon from "../assets/modal-delete-icon.svg";

const ModalDelete = ({ isOpen, setIsOpen, activity, deleteActivity }) => {
  const closeModal = () => {
    setIsOpen(false);
  };

  const handlerDelete = async (id) => {
    deleteActivity(id);
    setIsOpen(false);
  };
  return (
    <>
      <Transition appear show={isOpen} as={Fragment} data-cy="modal-delete">
        <Dialog
          as="div"
          className="relative z-10"
          onClose={closeModal}
          data-cy="modal-delete"
        >
          <Transition.Child as={Fragment}>
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child as={Fragment}>
                <Dialog.Panel className="w-[490px] h-[355px] py-[53px] px-[50px] overflow-hidden rounded-2xl bg-white shadow-xl">
                  <div
                    data-cy="modal-delete-icon"
                    className="w-full flex justify-center mb-[51px]"
                  >
                    <img src={modalDeleteIcon} alt="" />
                  </div>

                  <div
                    data-cy="modal-delete-title"
                    className="text-center mb-[46px]"
                  >
                    <p className="text-[18px] text-[#111111]">
                      Apakah anda yakin menghapus {activity.tag}
                    </p>
                    <p className="font-extrabold">“{activity.title}”?</p>
                  </div>

                  <div className="w-full flex justify-center gap-5">
                    <button
                      data-cy="modal-delete-cancel-button"
                      onClick={closeModal}
                      className="bg-[#F4F4F4] px-[43px] py-[13px] rounded-full"
                    >
                      Batal
                    </button>
                    <button
                      data-cy="modal-delete-confirm-button"
                      onClick={() => handlerDelete(activity.id)}
                      className="bg-[#ED4C5C] px-[43px] py-[13px] rounded-full text-white"
                    >
                      Hapus
                    </button>
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

export default ModalDelete;
