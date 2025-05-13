#include <iostream>
#include <thread>

using namespace std;

int balance = 0;

void deposit(int num){

  balance = balance + num;

}

int main()
{

    thread t1(deposit, 1000);
    thread t2(deposit, 2000);

    t1.join();
    t2.join();

    cout << balance << endl;

    return 0;
}
