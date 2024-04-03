package org.ssafy.d210._common.response.STTInfo;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@RequiredArgsConstructor
public class TranscriptionResult {
    private Results results;

    @Getter
    @Setter
    @RequiredArgsConstructor
    public static class Results {

        private List<Transcript> transcripts;
        private List<Item> items;

    }

    @Getter
    @Setter
    @RequiredArgsConstructor
    public static class Transcript {
        private String transcript;
    }

    @Getter
    @Setter
    @RequiredArgsConstructor
    public static class Item {
        private String type;
        private List<Alternative> alternatives;
    }

    @Getter
    @Setter
    @RequiredArgsConstructor
    public static class Alternative {
        private String confidence;
        private String content;
    }


}
