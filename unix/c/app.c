#include <stdio.h>


int add(int a, int b){
  return a+b;
}

int length(char s[]){
  char c= s[0];
  int length=0;

  while(c != '\0'){
    length++;
    c=s[length];
  }

  return length;
}

int main(){
  int a=20;
  int b=30;
  int c=add(a, b);

  char my_char='g';//1 byte

  size_t t=0; // 8 bytes unsigned

  char *myOtherString="This is my string";


  // fprintf(stdout, "size of an integer: %zu", sizeof(char));
  fprintf(stdout, "length of string :%d \n", length(myOtherString) );
  return 0;
}