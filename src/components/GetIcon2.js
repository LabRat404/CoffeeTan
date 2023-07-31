import * as Icons2 from "react-icons/ci";

const GetIcon2 = ({ icon, size, color }) => {
  const Icon2 = Icons2[icon];

  return <Icon2 size={size} color={color} />;
};

export default GetIcon2;
