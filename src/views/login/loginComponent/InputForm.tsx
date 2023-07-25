import React from "react";

type propsType = {
  title: String;
};

const InputForm = (props: propsType) => {
  const { title } = props;

  return (
    <div className="w-tcw h-tch flex items-start flex-col">
      <span className="text-sm text-orange-400" >{title}</span>
      <input className="w-f border border-gray-300 border-x-0 border-t-0" />
    </div>
  );
};

export default InputForm;
