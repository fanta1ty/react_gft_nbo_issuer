import useGetStudents from "@/api/useGetStudents";
import { useMemo } from "react";

type UseLoadStudentsParams = {
  keyword?: string;
  enabled?: boolean;
  certificateId: string;
};

export const useLoadStudentOptions = ({
  keyword,
  enabled,
  certificateId,
}: UseLoadStudentsParams) => {
  const queryResult = useGetStudents({ keepPreviousData: true, enabled });

  const data = queryResult.data;

  const students = useMemo(() => {
    if (!data || !keyword) {
      return data;
    }
    return data.filter(({ firstName, lastName }) => {
      const name = `${firstName} ${lastName}`;
      return name.toLowerCase().includes(keyword.toLowerCase());
    });
  }, [data, keyword]);

  // Push all students who already achieved the certificate to the bottom of the list
  const sorted = useMemo(() => {
    if (!students) {
      return students;
    }
    return students.slice().sort((a, b) => {
      if (isStudentAchievedCertificate(a, certificateId)) {
        return 1;
      }
      if (isStudentAchievedCertificate(b, certificateId)) {
        return -1;
      }
      return 0;
    });
  }, [certificateId, students]);

  return {
    ...queryResult,
    data: sorted,
  } as typeof queryResult;
};

export const isStudentAchievedCertificate = <
  Student extends { certificates: Array<{ id: string }> },
>(
  student: Student,
  certificateId: string,
) => {
  const certificates = student.certificates ?? [];

  const isAchieved = certificates.some(
    (certificate) => certificate.id === certificateId,
  );
  return isAchieved;
};
