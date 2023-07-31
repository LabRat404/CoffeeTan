import * as Icons3 from "react-icons/bi";

const GetIcon3 = ({ icon, size, color }) => {
  const Icon3 = Icons3[icon];

  return <Icon3 size={size} color={color} />;
};

export default GetIcon3;
