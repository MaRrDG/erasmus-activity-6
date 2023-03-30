import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

type IProps = {
    open: boolean;
    onClose: (lang: string) => void;
};

const LangModal = ({ open, onClose }: IProps) => {
    const [lang, setLang] = useState("RO");

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => {}}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-300 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                                <div>
                                    <label
                                        htmlFor="location"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Selecteaza limba / Select your language
                                    </label>
                                    <select
                                        id="location"
                                        name="location"
                                        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        value={lang}
                                        onChange={(e) => {
                                            setLang(e.target.value);
                                        }}
                                    >
                                        <option>RO</option>
                                        <option>EN</option>
                                    </select>
                                </div>
                                <div className="mt-5 sm:mt-6">
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-[#0A8DAA] px-4 py-2 text-base font-medium text-white shadow-sm sm:text-sm"
                                        onClick={() => {
                                            onClose(lang.toLocaleLowerCase());
                                        }}
                                    >
                                        Continue
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default LangModal;
