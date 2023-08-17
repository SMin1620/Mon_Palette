FROM openjdk:17-alpine

WORKDIR /usr/src/app

ARG JAR_PATH=./build/libs

COPY ./build/libs/palette-spring-0.0.1-SNAPSHOT.jar /build/libs/palette-spring-0.0.1-SNAPSHOT.jar

CMD ["java","-jar","/build/libs/palette-spring-0.0.1-SNAPSHOT.jar"]
