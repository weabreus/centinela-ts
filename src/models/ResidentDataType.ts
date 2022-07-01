interface ResidentDataType {
  id?: string;
  contact: {
    emergency: { name: string; phone: string }[];
    home: string;
    mobile: string;
    work: string;
  };
  email: string;
  name: string;
  photo?: string;
  complex: string;
}

export default ResidentDataType;
