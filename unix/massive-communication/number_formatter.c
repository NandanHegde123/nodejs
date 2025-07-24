#include <stdio.h>
#include <stdlib.h>
#include <string.h>


char* formatNumber(char* input, char begin, char divider){
  int length=strlen(input);

  int formattedLength = length +length/3 +2;

  char* formattedNumber=(char*)malloc(formattedLength);

  int j=0;
  int commaCount = length%3;

  formattedNumber[0]=begin;
  j=j+1;

  for (int i=0; i<length; i++){
    formattedNumber[j]=input[i];
    j=j+1;
     if(commaCount > 0 && i <length -1 && (i+1) %3 == commaCount){
        formattedNumber[j++]=divider;
      } else if (commaCount == 0 && i<length - 1 && (i+1) % 3 ==0){
        formattedNumber[j++]=divider;
    }
  }

  formattedNumber[j]=' ';
  formattedNumber[++j]='\0';



  return formattedNumber;

}

int main(int argc, char *argv[]){

  //open a file for writing
  FILE *outputFile= fopen(argv[1], "w");

  //allocate memory to save one complete number
  char *number=(char *)malloc(10*sizeof(char));
  int index=0;

  int num =fgetc(stdin);

  //keep reading until we get the end of file sign
  while(num != EOF){
    if(num != ' '){
      number[index]=num;
      index++;
    }

    if( num == ' '){
      if(index>0){
        number[index]='\0';
        // number[++index]='\0';

        // number[++index]='\0';
        char* formattedNumber= formatNumber(number, argv[2][0], argv[3][0]);

        
        fprintf(outputFile, "%s", formattedNumber);
        // fflush(outputFile);
        
        free(number);
        free(formattedNumber);
        number=(char *)malloc(10*sizeof(char));
        index=0;
      }
    }
    num=fgetc(stdin);
  }

  fclose(outputFile);


  exit(0);
}