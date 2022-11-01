  // Mengubah Format Mata uang
export const formatCurrency = (nominal) => {
    return nominal.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
    });
  };