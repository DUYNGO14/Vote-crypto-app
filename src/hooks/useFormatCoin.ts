// src/hooks/useFormatCoin.ts
export function useFormatCoin({ decimals: defaultDecimals = 5 }: { decimals?: number } = {}) {
  /**
   * Format số lượng coin:
   * - Dấu chấm (.) ngăn cách hàng nghìn
   * - Dấu phẩy (,) cho phần thập phân
   * - Bỏ số 0 dư ở cuối
   * - Giới hạn tối đa `decimals` số thập phân
   * - Ví dụ: 37463274647.83745 → "37.463.274.647,83745"
   */
  const formatCoin = (value: number | string, decimals: number = defaultDecimals): string => {
    if (value === null || value === undefined || value === '') return '0';
    const num = Number(value);
    if (isNaN(num)) return '0';

    // Làm tròn và bỏ 0 dư
    const rounded = num.toFixed(decimals).replace(/\.?0+$/, '');

    // Tách phần nguyên và phần thập phân
    const [intPart, decimalPart] = rounded.split('.');

    // Format phần nguyên với dấu chấm
    const formattedInt = Number(intPart).toLocaleString('en-US'); 
    // 👉 "de-DE" dùng quy ước: . = ngăn cách nghìn, , = thập phân

    // Ghép lại
    return decimalPart ? `${formattedInt}.${decimalPart}` : formattedInt;
  };

  return { formatCoin };
}
