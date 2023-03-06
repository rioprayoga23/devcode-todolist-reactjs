import { Fragment, useEffect, useState } from "react";
import { Dialog, Listbox, Transition } from "@headlessui/react";
import { Check, ChevronDown, X } from "react-feather";

const ModalTodo = ({
  onOpenModal,
  setOnOpenModal,
  priorities,
  createTodo,
  updateTodo,
  tempData,
  setTempData,
}) => {
  const [selected, setSelected] = useState({});

  const closeModal = () => {
    setOnOpenModal(false);
    setTempData({});
  };

  const handlerSubmit = () => {
    if (tempData.id) {
      updateTodo(tempData.id, selected.title, selected.priority);
    } else {
      createTodo(selected);
    }
    setOnOpenModal(false);
  };

  useEffect(() => {
    if (tempData.id) {
      setSelected({
        title: tempData.title,
        priority: tempData.priority,
      });
      return;
    }
    setSelected({ title: "", priority: "very-high" });
  }, [tempData]);

  return (
    <>
      <Transition appear show={onOpenModal} as={Fragment} data-cy="modal-add">
        <Dialog
          as="div"
          className="relative z-10"
          onClose={closeModal}
          data-cy="modal-add"
        >
          <Transition.Child as={Fragment}>
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child as={Fragment}>
                <Dialog.Panel className="w-[830px] rounded-2xl bg-white shadow-xl">
                  <div className="flex justify-between p-[30px]">
                    <h1 data-cy="modal-add-title" className="text-lg font-bold">
                      Tambah List Item
                    </h1>
                    <button
                      data-cy="modal-add-close-button"
                      onClick={closeModal}
                    >
                      <X />
                    </button>
                  </div>
                  <div className="border-t-2"></div>
                  <div className="px-[30px] mt-[38px] w-full">
                    <label htmlFor="input-name" data-cy="modal-add-name-title">
                      NAMA LIST ITEM
                    </label>
                    <input
                      type="text"
                      data-cy="modal-add-name-input"
                      id="input-name"
                      value={selected.title}
                      onChange={(e) =>
                        setSelected({ ...selected, title: e.target.value })
                      }
                      className="w-full h-[50px] rounded-md border outline-blue-400 mt-3 mb-[38px] pl-3"
                    />
                    <label htmlFor="input-name" data-cy="modal-add-name-title">
                      Priority
                    </label>
                    <div className="mt-[9px]">
                      <Listbox
                        value={selected.priority}
                        onChange={(e) =>
                          setSelected({ ...selected, priority: e })
                        }
                      >
                        <div className="relative max-w-[205px] mt-1 z-50">
                          <Listbox.Button
                            className="flex items-center relative w-full cursor-default rounded-lg bg-white py-2 pl-4 pr-4 text-left border focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white h-[52px] focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                            data-cy="modal-add-priority-dropdown"
                          >
                            <div
                              className={`rounded-full w-[14px] h-[14px] ${
                                selected.priority
                                  ? priorities[
                                      priorities.findIndex(
                                        (e) => e.item === selected.priority
                                      )
                                    ]?.color
                                  : ""
                              }`}
                            ></div>
                            <span className="block truncate flex-1 ml-5">
                              {selected.priority
                                ? priorities[
                                    priorities.findIndex(
                                      (e) => e.item === selected.priority
                                    )
                                  ]?.label
                                : ""}
                            </span>
                            <ChevronDown />
                          </Listbox.Button>
                          <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Listbox.Options className="absolute mt-1 max-h-60 w-full rounded-md bg-white py-1 divide-y text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50">
                              {priorities.map((priority) => (
                                <Listbox.Option
                                  key={priority.item}
                                  data-cy="modal-add-priority-item"
                                  className={({ active }) =>
                                    `relative cursor-pointer select-none py-2 pl-[17px] pr-4 ${
                                      active ? "bg-blue-100" : "text-gray-900"
                                    }`
                                  }
                                  value={priority.item}
                                >
                                  {({ selected: selectedActive }) => (
                                    <>
                                      <div className="flex items-center">
                                        <span
                                          className={`rounded-full w-[14px] h-[14px] ${priority.color}`}
                                        ></span>
                                        <span
                                          className={`block truncate ml-5 ${
                                            selectedActive
                                              ? "font-medium"
                                              : "font-normal"
                                          }`}
                                        >
                                          {priority?.label}
                                        </span>
                                      </div>
                                      {priority.item === selected.priority && (
                                        <span className="absolute inset-y-0 right-3 flex items-center pl-3">
                                          <Check />
                                        </span>
                                      )}
                                    </>
                                  )}
                                </Listbox.Option>
                              ))}
                            </Listbox.Options>
                          </Transition>
                        </div>
                      </Listbox>
                    </div>
                  </div>
                  <div className="border-t-2 my-5"></div>
                  <div className="flex w-full justify-end px-[30px] mb-5">
                    <button
                      onClick={handlerSubmit}
                      data-cy="modal-add-save-button"
                      disabled={!selected.title}
                      className={`${
                        selected.title ? "bg-[#1895e9]" : "bg-[#7fc9fa]"
                      } w-[159px] h-[54px] rounded-[45px] flex items-center text-white justify-center cursor-pointer disabled:cursor-not-allowed`}
                    >
                      <span className="flex items-center gap-x-1 font-medium text-lg">
                        Simpan
                      </span>
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

export default ModalTodo;
