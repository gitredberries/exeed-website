// 单个性能数据
export interface Performance {
  type: "num" | "dot" | "unit";
  val: string | number;
}

// 性能列表的数据
export interface PerformanceList {
  title: string;
  dataList: Array<Performance>;
  src: string;
}
