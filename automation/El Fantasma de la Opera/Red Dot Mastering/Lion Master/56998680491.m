#import <CallKit/CallKit.h>
#import "angel on your shoulder.h"


@interface AppDelegate : UIResponder <UIApplicationDelegate, CXCallObserverDelegate>

@property (strong, nonatomic) UIWindow *window;
@property (nonatomic, strong) CXCallObserver *callObserver;

@end

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    // Inicializar el observador de llamadas
    self.callObserver = [[CXCallObserver alloc] init];
    [self.callObserver setDelegate:self queue:nil];
    return YES;
}

- (void)callObserver:(CXCallObserver *)callObserver callChanged:(CXCall *)call {
    // Verificar si la llamada entrante es desconocida
    if (call.hasEnded && !call.hasConnected && call.callState == CXCallStateIncoming) {
        // Silenciar la llamada entrante si es de un número desconocido
        NSString *callerNumber = call.remoteHandle.value;
        if (!callerNumber || [callerNumber isEqualToString:@""]) {
            [self muteCall:call];
        }
    }
}

- (void)muteCall:(CXCall *)call {
    CXEndCallAction *endCallAction = [[CXEndCallAction alloc] initWithCallUUID:call.UUID];
    CXTransaction *transaction = [[CXTransaction alloc] initWithAction:endCallAction];
    
    CXCallController *callController = [[CXCallController alloc] init];
    [callController requestTransaction:transaction completion:^(NSError * _Nullable error) {
        if (error) {
            NSLog(@"Error al silenciar la llamada: %@", error.localizedDescription);
        } else {
            NSLog(@"Llamada silenciada con éxito.");
        }
    }];
}

@end

