package org.ssafy.d210.walk.dto.response;

import lombok.Getter;
import lombok.ToString;

import java.util.List;

@Getter
@ToString
public class FitnessResponse {
    private List<Bucket> bucket;

    public List<Bucket> getBucket() {
        return bucket;
    }

    public void setBucket(List<Bucket> bucket) {
        this.bucket = bucket;
    }

    public static class Bucket {
        private List<DataSet> dataset;

        public List<DataSet> getDataset() {
            return dataset;
        }

        public void setDataset(List<DataSet> dataset) {
            this.dataset = dataset;
        }
    }

    public static class DataSet {
        private List<DataPoint> point;

        public List<DataPoint> getPoint() {
            return point;
        }

        public void setPoint(List<DataPoint> point) {
            this.point = point;
        }
    }

    public static class DataPoint {
        private List<Value> value;
        private String dataTypeName;
        private String startTimeNanos;
        private String endTimeNanos;

        public List<Value> getValue() {
            return value;
        }

        public void setValue(List<Value> value) {
            this.value = value;
        }

        public String getDataTypeName() {
            return dataTypeName;
        }

        public void setDataTypeName(String dataTypeName) {
            this.dataTypeName = dataTypeName;
        }

        public String getStartTimeNanos() {
            return startTimeNanos;
        }

        public void setStartTimeNanos(String startTimeNanos) {
            this.startTimeNanos = startTimeNanos;
        }

        public String getEndTimeNanos() {
            return endTimeNanos;
        }

        public void setEndTimeNanos(String endTimeNanos) {
            this.endTimeNanos = endTimeNanos;
        }
    }

    public static class Value {
        private int intVal;
        private float fpVal;

        public long getIntVal() {
            return intVal;
        }

        public void setIntVal(int intVal) {
            this.intVal = intVal;
        }

        public float getFpVal() {
            return fpVal;
        }

        public void setFpVal(float fpVal) {
            this.fpVal = fpVal;
        }
    }
}

